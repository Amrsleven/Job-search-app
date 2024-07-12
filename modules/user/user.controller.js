import { connectDB } from "../../connection.js";
import User from "../../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt, { compareSync, hashSync } from "bcrypt";
import {auth} from "../../middlewares/authenicate.middleware.js"


export const greet = async (req,res,next) => { res.json("hello user j") };
 
// sign up
export const signUp = async (req, res, next) => {
    const { firstName, lastName, email, password,
        recoveryEmail,dateOfBirth,mobileNumber,role,status} = req.body;
  
    const isEmailExists = await User.findOne({ email });
    if (isEmailExists) {
      return next(
        new ErrorClass("Email already exists", 400, "Email already exists")
      );
    }
    const fullName = firstName +" " + lastName;
    const userInstance = new User({
      firstName,lastName,userName:fullName,email,
      password: hashSync(password, +process.env.SALT_ROUNDS),
      recoveryEmail,dateOfBirth,mobileNumber,role,status
    });
  
    const token = jwt.sign(
      { userId: userInstance._id },
      process.env.CONFIRMATION_SECRET,
      {
        expiresIn: "90h",
      }
    );
    const newUser = await userInstance.save();
    res.status(201).json({ message: "User created", user: newUser , tokenIs: token });
  };
  
  // sign in
  export const signin = async (req, res,next) => {

    const { email , password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(
        new ErrorClass("Invalid credentials", 400, "Invalid credentials")
      );
    }
    const isMatch = compareSync(password, user.password);
    if (!isMatch) {
      return next(
        new ErrorClass("Invalid credentials", 400, "Invalid credentials")
      );
    }
    const updatedStatus = await User.findByIdAndUpdate(user._id,{status:"onLine"},{new:true})
    const token = jwt.sign({ userId: user._id }, process.env.LOGIN_SECRET);
    
    res.status(200).json({ message: "sign in success", token , updatedStatus });
  };

  //update user
  export const updateUser = async(req,res,next)=>{
    const {_id }= req.authUser;
    const {recoveryEmail,mobileNumber}=req.body;
    const checkExist = await User.find ({recoveryEmail} || {mobileNumber})
    if (checkExist){return res.status(404).json("recoveryEmail or mobile number already exists")}
    const updatedUser = await User.findByIdAndUpdate( _id ,{recoveryEmail,mobileNumber},{new:true});
    if(!updatedUser){return res.status(404).json("no user found to be updated")};
    res.status(200).json({message:"user updated successfully", updatedUser })
}


//delete user
export const deleteUser= async(req,res)=>{
  const {_id}= req.authUser;
  const deletedUser = await User.findByIdAndDelete(_id)
  if(!deletedUser ){return res.status(404).json("no user found to be deleted")};
  res.json({message:"user deleted successfully", deletedUser })
}

// get user account data
export const accountData = async (req,res,next)=>{
  const {_id}= req.authUser;
  const isUserExist = await User.findOne({_id});
  if(!isUserExist){return res.status(404).json({message:"no such user found"})};
 res.status(200).json({message: "user account data found successfully", isUserExist })
}

// get profile data for another user
export const anotherAccountData = async (req,res,next)=>{
  const {_id}= req.params;
  const {viewer}= req.authUser;
  const isViewerLogged = await User.findOne({viewer});
  if(!isViewerLogged){return res.status(404).json({message:"no such viewer is signed in"})};
  const isUserExist = await User.findOne({_id});
  if(!isUserExist){return res.status(404).json({message:"no such user found"})};
 res.status(200).json({message: "another user account data found successfully", name:isUserExist.userName ,
  phone: isUserExist.mobileNumber , email: isUserExist.email , birthday: isUserExist.dateOfBirth , 
  role: isUserExist.role
  })
}

// update password
export const updatePassword = async (req, res,next) => {
  const {_id}= req.authUser;
  const { newPassword } = req.body;
  const isUserlogged = await User.findOne({_id});
  if (!isUserlogged) {
    return next(
      new ErrorClass("can not change password", 400, "please sign in")
    );
  }
  const updatedUser = await User.findByIdAndUpdate( _id ,{password:hashSync(newPassword, +process.env.SALT_ROUNDS)}
  ,{new:true});
  res.status(200).json({message:"password updated successfully", updatedUser })
};

// forget password
export const forgetPassword = async (req, res,next) => {
  const {_id}= req.authUser;
  const { email , mobileNumber  } = req.body;
  const checkInfo1 = await User.findOne({email});
  if(!checkInfo1){return res.status(404).json({message:"wrong information - can not change password"})};
  const checkInfo2 = await User.findOne({mobileNumber});
  if(!checkInfo2){return res.status(404).json({message:"wrong information - can not change password"})};
  res.status(200).json({message:"you can now update your password using update password API" })
};

// get accounts associated with one recovery emain
export const accountsReoveryEmail = async (req,res,next)=>{
  const {_id}= req.authUser;
  const { recoveryEmail  } = req.body;
  const users = await User.find({recoveryEmail});
  if(!users){return res.status(404).json({message:"no such users found"})};
 res.status(200).json({message: "users with the same recovery email are:", users })
}


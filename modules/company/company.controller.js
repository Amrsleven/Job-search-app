import { connectDB } from "../../connection.js";
import Company from "../../models/company.model.js"
import User from "../../models/user.model.js"
import {auth} from "../../middlewares/authenicate.middleware.js"
import Job from "../../models/job.model.js"


// add company
export const addCompany = async (req, res, next) => {
    const { companyName,description,industry,address,numberOfEmployees,
        companyEmail} = req.body;
        const { _id } = req.authUser;
    const isEmailExists = await Company.findOne({ companyEmail });
    if (isEmailExists) {
        res.status(500).json({ message: "company email already exists"});
    }

    const companyInstance = new Company({
        companyName,description,industry,address,numberOfEmployees,
        companyEmail,companyHR:_id });
  
    const newCompany = await companyInstance.save();
    res.status(201).json({ message: "Company created", company: newCompany });
 };
  
  //update company
  export const updateCompany = async(req,res,next)=>{
    const {companyHR }= req.authUser;
    const {companyName} = req.params;
    const {description,address,numberOfEmployees}=req.body;
    const isNameExists = await Company.findOne({ companyName });
    if (!isNameExists) {
        res.status(500).json({ message: "no such company exists to be updated"});
    }
    const x = isNameExists.__v + 1;
    const updatedCompany= await Company.findByIdAndUpdate(isNameExists._id ,{description,address,
        numberOfEmployees,__v:x},{new:true});
    if(!updatedCompany){return res.status(404).json("no company found to be updated")};
    res.status(200).json({message:"company updated successfully", updatedCompany })
}

//delete company
export const deleteCompany= async(req,res)=>{
    const {_id}= req.authUser;
    const {companyName} = req.body;
    const isNameExists = await Company.findOne({ companyName });
    if (!isNameExists) {
        res.status(500).json({ message: "no such company exists to be deleted"});
    }
    const deletedCompany = await Company.findByIdAndDelete(isNameExists._id)
    if(!deletedCompany ){return res.status(404).json("no company found to be deleted")};
    res.json({message:"company deleted successfully", deletedCompany })
  }
  
//search for a company with a name
export const searchForCompany = async(req,res)=>{
    const {_id}= req.authUser;
    const {companyName} = req.body;
    const isNameExists = await Company.findOne({ companyName });
    if (!isNameExists) {
        res.status(500).json({ message: "no such company exists to be searched for"});
    }
    res.json({message:"company data are: ", isNameExists })
  }
  
//get company data
export const companyData = async (req,res,next)=>{
    const {id}= req.authUser;
    const {_id} = req.params;
    const isCompanyExist = await Company.findById({_id});
    if(!isCompanyExist ){return res.status(404).json({message:"no such company found"})};

    const allJobs = await Job.find({addedBy:isCompanyExist.companyHR})

   res.status(200).json({message: "company data found successfully",companyData: isCompanyExist
    ,jobsRelatedToCompany:allJobs
    })
  }

  
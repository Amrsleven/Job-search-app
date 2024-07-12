import mongoose from "mongoose";
const {Schema , model} = mongoose;


const userSchema = new Schema ({

    firstName: {type: String , required:true ,trim: true,  minLength: 3},

    lastName: {type: String , required:true ,trim: true,  minLength: 3},

    userName: {type: String  },

    email: {type: String , required:true , unique: true },

    password : {type: String , required:true},

    recoveryEmail: {type: String , required:true  },

    dateOfBirth: {type: Date , required:true},

    mobileNumber: {type: Number , required:true },

    role: { type: String, default: "user", enum: ["user","companyHR"],  },

    status: { type: String, default: "offline", enum: ["online","offline"],  },

    isConfirmed: { type: Boolean, default: false,},
      
},{
    timestamps:true, versionKey: "version_key"
});

export default mongoose.models.User || model("User",userSchema);
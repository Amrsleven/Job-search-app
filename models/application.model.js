import mongoose from "mongoose";
const {Schema , model} = mongoose;
import User from "./user.model.js"

const applicationSchema = new Schema ({

    jobId:{type: Schema.Types.ObjectId , ref:"Job" , required:true  },

    userId:{type: Schema.Types.ObjectId , ref:"User" , required:true },

    userTechSkills: [{type: String , required:true ,  minLength: 3  }],

    userSoftSkills: [{type: String , required:true ,  minLength: 3 }],

    userResume: {type: String , required:true ,  minLength: 3},

    
},{
    timestamps:true, versionKey: "version_key"
});

export default mongoose.models.Application || model("Application",applicationSchema);
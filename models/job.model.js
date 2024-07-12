import mongoose from "mongoose";
const {Schema , model} = mongoose;
import User from "./user.model.js"

const jobSchema = new Schema ({

    jobTitle: {type: String , unique:true ,required:true ,trim: true,  minLength: 3},

    jobLocation: {type: String , required:true ,  enum:["onsite","remotely","hybrid"]},

    workingTime: {type: String , required:true ,  enum:["part-time","full-time"]},

    seniorityLevel: {type: String , required:true ,  enum:["junior","mid-level"
        , "senior","team-lead","CTO"
    ]},

    jobDesc: {type: String , required:true ,  minLength: 3},

    technicalSkills: [{type: String , required:true ,  minLength: 3}],

    softSkills: [{type: String , required:true ,  minLength: 3}],

    addedBy:{type: Schema.Types.ObjectId , ref:"User" }
    
},{
    timestamps:true
});

export default mongoose.models.Job || model("Job",jobSchema);
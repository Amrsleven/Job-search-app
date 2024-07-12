import { connectDB } from "../../connection.js";
import Job from "../../models/job.model.js"
import User from "../../models/user.model.js"
import Company from "../../models/company.model.js"
import {auth} from "../../middlewares/authenicate.middleware.js"


// add job
export const addJob = async (req, res, next) => {
    const { jobTitle,jobLocation,workingTime,seniorityLevel,jobDesc,
        technicalSkills, softSkills} = req.body;
        const { _id } = req.authUser;
    const isTitleExists = await Job.findOne({ jobTitle });
    if (isTitleExists) {
        res.status(500).json({ message: "job already exists"});
    }

    const jobInstance = new Job({
        jobTitle,jobLocation,workingTime,seniorityLevel,jobDesc,
        technicalSkills, softSkills , addedBy:_id });
  
    const newJob = await jobInstance .save();
    res.status(201).json({ message: "job created", JobIs: newJob });
 };

  //update job
  export const updateJob = async(req,res,next)=>{
    const {addedBy}= req.authUser;
    const {jobTitle} = req.params;
    const {jobLocation,workingTime,seniorityLevel,jobDesc}=req.body;
    const isJobExists = await Job.findOne({ jobTitle });
    if (!isJobExists) {
        res.status(500).json({ message: "no such job exists to be updated"});
    }
    const x = isJobExists.__v + 1;
    const updatedJob = await Job.findByIdAndUpdate(isJobExists._id ,{jobLocation,workingTime,
        seniorityLevel,jobDesc , __v:x},{new:true});
    if(!updatedJob){return res.status(404).json("no job found to be updated")};
    res.status(200).json({message:"job updated successfully", updatedJob })
} 

//delete job
export const deleteJob= async(req,res)=>{
    const {_id}= req.authUser;
    const {jobTitle} = req.body;
    const isJobExists = await Job.findOne({ jobTitle });
    if (!isJobExists) {
        res.status(500).json({ message: "no such job exists to be deleted"});
    }
    const deletedJob = await Job.findByIdAndDelete(isJobExists._id)
    if(!deletedJob ){return res.status(404).json("no job found to be deleted")};
    res.json({message:"job deleted successfully", deletedJob })
}

// get all jobs with their company information
export const jobsList = async (req,res,next) =>{
    const {_id}= req.authUser;
    const jobs = await Job.find();
    // const popu = await Job.find().populate([{path:"addedBy",select:"userName"}]);
    const jobsAddedBy = await Job.collection.distinct("addedBy")
    const companyInfo = await Company.find({companyHR:jobsAddedBy});
    res.status(200).json({message:"Jobs list: ", jobs  , companyInfo})
}

// get all jobs  for specific company
export const jobsForCompany = async (req,res,next)=>{
    const {_id}= req.authUser; 
    const {companyName} = req.body;
    const companydata = await Company.find({companyName});
    if (!companydata[0]) {
        res.status(500).json({ message: "no such job exists to be found"});
    }
    const allJobs = await Job.find({addedBy:companydata[0].companyHR})
    res.status(200).json({message:"all jobs for specific company: ", allJobs })
}

// get all jobs that match the filters
export const jobsFilter = async (req,res,next)=>{
    const {_id}= req.authUser; 
    const {jobLocation,workingTime,seniorityLevel,
        } = req.body;
    const companydata = await Job.find({jobLocation,workingTime,seniorityLevel});
    if (!companydata[0]) {
        res.status(500).json({ message: "no such conditions exist to be found"});
    }
   
    res.status(200).json({message:"all jobs after filtering: ", companydata })
}


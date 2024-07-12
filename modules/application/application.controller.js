import { connectDB } from "../../connection.js";
import Application from "../../models/application.model.js"
import User from "../../models/user.model.js"
import Company from "../../models/company.model.js"
import {auth} from "../../middlewares/authenicate.middleware.js"

// apply to job (add application)
export const addApp= async (req, res, next) => {
    const { userTechSkills,userSoftSkills,userResume} = req.body;
    const {jobId}=req.params;
    const { _id } = req.authUser;

    const applicationInstance = new Application({
    jobId ,userId:_id , userTechSkills,userSoftSkills,userResume });

    const newApplication = await applicationInstance.save();
    
    res.status(201).json({ message: "application created", applicationIs: newApplication });
 };


// get all applications for specific job
export const allAppsForJob = async (req,res,next)=>{
    const {_id}= req.authUser;
    const {jobId} = req.body;
    const apps = await Application.find({jobId});
    if(!apps[0]){return res.status(404).json({message:"no such applications found"})};
    let x = [];
    for(let i =0 ; i < apps.length ; i++){
        x.push("userTechSkills", apps[i].userTechSkills,
            "userSoftSkills",apps[i].userSoftSkills,"CV",apps[i].userResume )
    }

   res.status(200).json({message: "all applications found successfully"
    ,x
    })
  }

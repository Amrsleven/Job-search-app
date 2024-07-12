import Joi from "joi";

export const addJobSchema = {
    body: Joi.object({

        jobTitle: Joi.string().min(3).max(30).required(),
        jobLocation: Joi.string().valid("onsite","remotely","hybrid").required(),
        workingTime: Joi.string().valid("part-time","full-time").required(),
        seniorityLevel: Joi.string().valid("junior","mid-level"
        , "senior","team-lead","CTO").required(),
        jobDesc: Joi.string().min(3).max(30).required(),
        technicalSkills: Joi.array().required(),
        softSkills: Joi.array().required(),
        
  }).options({ presence: "required" }),
};

export const updateJobSchema = {
    body: Joi.object({

        jobLocation: Joi.string().valid("onsite","remotely","hybrid").required(),
        workingTime: Joi.string().valid("part-time","full-time").required(),
        seniorityLevel: Joi.string().valid("junior","mid-level"
        , "senior","team-lead","CTO").required(),
        jobDesc: Joi.string().min(3).max(30).required(),
        
  }).options({ presence: "required" }),
};


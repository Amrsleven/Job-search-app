import Joi from "joi";

export const addAppSchema = {
    body: Joi.object({

        userTechSkills: Joi.array().required(),
        userSoftSkills: Joi.array().required(),
        userResume: Joi.string().min(3).max(30).required()
       
        
  }).options({ presence: "required" }),
};

import Joi from "joi";

export const addCompanySchema = {
    body: Joi.object({

        companyName: Joi.string().min(3).max(30).alphanum().required(),
        description: Joi.string().min(3).max(30).alphanum().required(),
        industry: Joi.string().min(3).max(30).alphanum().required(),
        address: Joi.string().min(3).max(30).alphanum().required(),
        numberOfEmployees: Joi.number().integer().required().min(11).max(20),
        companyEmail: Joi.string().required().email({
        tlds: { allow: ["com", "net", "org"] },
         }),
       
  }).options({ presence: "required" }),
};

export const updateCompanySchema = {
  body: Joi.object({

   
      description: Joi.string().min(3).max(30).alphanum().required(),
     
      address: Joi.string().min(3).max(30).alphanum().required(),
      numberOfEmployees: Joi.number().integer().required().min(11).max(20),
     
     
}).options({ presence: "required" }),
};
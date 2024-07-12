import Joi from "joi";

export const SignUpSchema = {
    body: Joi.object({

      firstName: Joi.string().min(3).max(30).alphanum().required(),
      lastName: Joi.string().min(3).max(30).alphanum().required(),
      email: Joi.string().required().email({
        tlds: { allow: ["com", "net", "org"] },
      }),

      password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*?&]{8,}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must have at least one lowercase letter, one uppercase letter, one number and one special character",
        "any.required": "You need to provide a password",
        "string.min": "Password should have a minimum length of 3 characters",
      }),

      recoveryEmail: Joi.string().optional().email({
        tlds: { allow: ["com", "net", "org"] },
      }),

       dateOfBirth: Joi.date().required(),
       mobileNumber: Joi.number().integer().required(),
       role: Joi.string().valid("user","companyHR").required(),
       status: Joi.string().valid("online","offline").required(),




  }).options({ presence: "required" }),
};


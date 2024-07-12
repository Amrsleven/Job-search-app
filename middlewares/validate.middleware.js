import { ErrorClass } from "../error-handler/error-handle-class.js";


/**
 * @param {object} schema - Joi schema object
 * @returns  {Function} - Middleware function
 * @description - Middleware function to validate the request data against the schema
*/

const reqKeys = ["body", "query", "params", "headers"];

export const validationMiddleware = (schema) => {
  return (req, res, next) => {
   
    let validationErrors = [];

    for (const key of reqKeys) {
     
      const validationResult = schema[key]?.validate(req[key], {
        abortEarly: false,
      });

     
      if (validationResult?.error) {
        validationErrors.push(validationResult?.error?.details);
      }
    }

   
    validationErrors.length
      ? next(new ErrorClass("Validation Error", 400, validationErrors))
      : next();
  };
};
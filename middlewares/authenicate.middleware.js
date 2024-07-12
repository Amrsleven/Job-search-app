import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {ErrorClass} from "../error-handler/error-handle-class.js"
/**
 * @returns {function} return middleware function
 * @description Check if the user is authenticated or not
 */

export const auth = () => {
  return async (req, res, next) => {
   
    const { token } = req.headers;
   
    if (!token) {
      return next(
        new ErrorClass("Token is required", 404, "Token is required")
      );
    }
   
    if (!token.startsWith(process.env.PREFIX_SECRET)) {
      return next(new ErrorClass("Invalid token", 400, "Invalid token"));
    }
   x
    const originalToken = token.split(" ")[1];

  
    const data = jwt.verify(originalToken, process.env.LOGIN_SECRET);
   
    if (!data?.userId) {
      return next(
        new ErrorClass("Invalid token payload", 400, "Invalid token payload")
      );
    }
   
    const isUserExists = await User.findById(data?.userId);
    if (!isUserExists) {
      return next(new ErrorClass("User not found", 404, "User not found"));
    }
    
    req.authUser = isUserExists;
    next();
  };
};

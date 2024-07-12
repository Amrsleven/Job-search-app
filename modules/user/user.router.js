import { Router } from "express";
const router = Router();
import * as userController from "./user.controller.js";
import { errorHandler } from "../../error-handler/error.middleware.js";
import {validationMiddleware} from "../../middlewares/validate.middleware.js"
import { SignUpSchema } from "./user.schema.js";
import {auth} from "../../middlewares/authenicate.middleware.js"
import {authorizationMiddleware} from "../../middlewares/authorize.middleware.js"


router.get("/userHi",errorHandler(userController.greet))

router.post("/signUp",validationMiddleware(SignUpSchema),errorHandler(userController.signUp))

router.get("/signin",errorHandler(userController.signin))

router.put("/updateUser",errorHandler(auth()),authorizationMiddleware(["user","companyHR"]),
errorHandler(userController.updateUser))

router.delete("/deleteUser" ,errorHandler(auth()),authorizationMiddleware(["user","companyHR"]),
errorHandler(userController.deleteUser) )

router.get("/accountData", errorHandler(auth()),authorizationMiddleware(["user","companyHR"]),
errorHandler(userController.accountData))

router.get("/anotherAccountData/:_id",errorHandler(auth()),authorizationMiddleware(["user","companyHR"]),
errorHandler(userController.anotherAccountData))

router.put("/updatePassword",errorHandler(auth()),authorizationMiddleware(["user","companyHR"]),
errorHandler(userController.updatePassword))

router.get("/forgetPassword",errorHandler(auth()),authorizationMiddleware(["user","companyHR"]),
errorHandler(userController.forgetPassword))

router.get("/accountsRcoveryEmail",errorHandler(auth()),authorizationMiddleware(["user","companyHR"]),
errorHandler(userController.accountsReoveryEmail))


export default router;


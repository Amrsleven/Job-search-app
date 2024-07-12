import { Router } from "express";
const router = Router();
import * as appController from "./application.controller.js";
import { errorHandler } from "../../error-handler/error.middleware.js";
import {auth} from "../../middlewares/authenicate.middleware.js"
import {authorizationMiddleware} from "../../middlewares/authorize.middleware.js"
import {validationMiddleware} from "../../middlewares/validate.middleware.js"
import { addAppSchema } from "./application.schema.js";



router.post("/addApp/:jobId",errorHandler(auth()),errorHandler(validationMiddleware(addAppSchema))
,errorHandler(authorizationMiddleware(["user"])),errorHandler(appController.addApp))

router.get("/allAppsForJob",errorHandler(auth())
,errorHandler(authorizationMiddleware(["companyHR"])),errorHandler(appController.allAppsForJob))


export default router;
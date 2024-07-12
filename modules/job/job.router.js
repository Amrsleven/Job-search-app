import { Router } from "express";
const router = Router();
import * as jobController from "./job.controller.js";
import { errorHandler } from "../../error-handler/error.middleware.js";
import {auth} from "../../middlewares/authenicate.middleware.js"
import {authorizationMiddleware} from "../../middlewares/authorize.middleware.js"
import {validationMiddleware} from "../../middlewares/validate.middleware.js"
import { addJobSchema } from "./job.schema.js";
import { updateJobSchema } from "./job.schema.js";


router.post("/addJob",errorHandler(auth()),errorHandler(validationMiddleware(addJobSchema))
,errorHandler(authorizationMiddleware(["companyHR"])),errorHandler(jobController.addJob))

router.put("/updateJob/:jobTitle",errorHandler(auth()),errorHandler(validationMiddleware(updateJobSchema))
,errorHandler(authorizationMiddleware(["companyHR"])),errorHandler(jobController.updateJob))

router.delete("/deleteJob",errorHandler(auth())
,errorHandler(authorizationMiddleware(["companyHR"])),errorHandler(jobController.deleteJob))

router.get("/jobsList",errorHandler(auth())
,errorHandler(authorizationMiddleware(["companyHR","user"])),errorHandler(jobController.jobsList))

router.get("/jobsForCompany",errorHandler(auth())
,errorHandler(authorizationMiddleware(["companyHR","user"])),errorHandler(jobController.jobsForCompany))

router.get("/jobsFilter",errorHandler(auth())
,errorHandler(authorizationMiddleware(["companyHR","user"])),errorHandler(jobController.jobsFilter))

export default router;
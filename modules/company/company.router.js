import { Router } from "express";
const router = Router();
import * as companyController from "./company.controller.js";
import { errorHandler } from "../../error-handler/error.middleware.js";
import {validationMiddleware} from "../../middlewares/validate.middleware.js"
import { addCompanySchema } from "./company.schema.js";
import {updateCompanySchema} from "./company.schema.js"
import {auth} from "../../middlewares/authenicate.middleware.js"
import {authorizationMiddleware} from "../../middlewares/authorize.middleware.js"

router.post("/addCompany",errorHandler(auth()),errorHandler(validationMiddleware(addCompanySchema))
,errorHandler(authorizationMiddleware(["companyHR"])),errorHandler(companyController.addCompany))

router.put("/updateCompany/:companyName",errorHandler(auth()),errorHandler(validationMiddleware(updateCompanySchema))
,errorHandler(authorizationMiddleware(["companyHR"])),errorHandler(companyController.updateCompany))

router.delete("/deleteCompany",errorHandler(auth())
,errorHandler(authorizationMiddleware(["companyHR"])),errorHandler(companyController.deleteCompany))

router.get("/searchForCompany",errorHandler(auth())
,errorHandler(authorizationMiddleware(["user","companyHR"])),errorHandler(companyController.searchForCompany))

router.get("/companyDataWithJobs/:_id",errorHandler(auth())
,errorHandler(authorizationMiddleware(["companyHR"])),errorHandler(companyController.companyData))

export default router;
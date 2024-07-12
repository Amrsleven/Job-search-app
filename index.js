import express from "express"
import path from "path";
import { config } from "dotenv";

import { connectDB } from "./connection.js"
import userRouter from "./modules/user/user.router.js"
import jobRouter from "./modules/job/job.router.js"
import companyRouter from "./modules/company/company.router.js"
import appRouter from "./modules/application/application.router.js"


import { globalResponse } from "./error-handler/error.middleware.js"


// to use port 3000 (default)=> node --watch index.js
// to use port 4000 (production) => npm run start
const app = express()
if (process.env.NODE_ENV == "prod") {
    config({ path: path.resolve(".prod.env") });
  }
config();
const port = process.env.PORT;


app.use(express.json())
app.use("/user",userRouter)
app.use("/job",jobRouter)
app.use("/company",companyRouter)
app.use("/app",appRouter)


app.use(globalResponse);
connectDB()


console.log("hello")
app.get("/",(req,res)=>{res.send("hello query")})
app.listen(port,()=>{
    console.log(`server is running on port: ${port}`)
})

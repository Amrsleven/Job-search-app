import mongoose from "mongoose";

export const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.CONNECTION_DB_URI);
        console.log("connected to data base")
    }
    catch(error){
      console.log("error in data base is: ",error)
    }
}
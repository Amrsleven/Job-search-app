import mongoose from "mongoose";
const {Schema , model} = mongoose;
import User from "./user.model.js"

const companySchema = new Schema ({

    companyName: {type: String , required:true ,trim: true,  minLength: 3, unique:true},

    description: {type: String , required:true ,  minLength: 3},

    industry: {type: String , required:true ,  minLength: 3},

    address: {type: String , required:true ,  minLength: 3},

    numberOfEmployees: {type: Number , required:true , min:11 , max: 20 },

    companyEmail: {type: String , required:true , unique: true },

    companyHR:{type: Schema.Types.ObjectId , ref:"User" }

},{
    timestamps:true, 
});

export default mongoose.models.Company || model("Company",companySchema);


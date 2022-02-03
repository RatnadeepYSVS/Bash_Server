import mongoose from "mongoose"
import { codeSchema } from "./Codes.js"
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    }
})
export default mongoose.model("User",userSchema)
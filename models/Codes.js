import mongoose from "mongoose"
import shortid from "shortid"
export const codeSchema = new mongoose.Schema({
    _id:{
        type:"String",
        required:true,
        unique:true
    },
    code:{
        type:String,
        required:true,
    },
    language:{
        type:String,
        required:true
    },
    input:{
        type:String,
        default:""
    },
    output:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
})
export default mongoose.model("Code",codeSchema)
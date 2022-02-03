import Codes from "../models/Codes.js";
import axios from "axios";
import shortid from "shortid";
export const saveCode = async(req,res)=>{
    const { body } = req
    const { code,language,input } = body
    const data = JSON.stringify({
        code,
        input,
        language
    })
    const response= await axios.post(process.env.apiurl,data,{
        headers:{
            "Content-type":"application/json"
        }
    })
    const _id = shortid.generate()
    const { output } = response.data
    const user = res.locals.user
    if(!user) return res.status(400).json({ msg:"Userid Missing" })
    const codeThere = await Codes.find({ code,user })
    if(codeThere.length>0) return res.status(200).json({msg:"Code already saved before"})
    const codeData = await Codes.create({ ...body,output,user:user._id,_id })
    return res.status(201).json({msg:"Code Saved",codeData})
}
export const getUserCodes = async(req,res)=>{
    const userData = res.locals.user
    const user = userData._id
    if(!user) return res.status(400).json({ msg:"Userid Missing" })
    const codes = await Codes.find({ user })
    return res.status(200).json({ codes })   
}
export const getCode = async(req,res)=>{
    const { id } = req.params
    if(!id) return res.status(404).json({msg:"Url Not Found"})
    const code = await Codes.findById(id)
    return res.status(200).json({ code })
}
export const runCode = async(req,res)=>{
    const { language,code,input } = req.body
    const data = JSON.stringify({
        code,
        input,
        language
    })
    try {
        const response= await axios.post(process.env.apiurl,data,{
            headers:{
                "Content-type":"application/json"
            }
        })
        const { output } = response.data
        return res.status(200).json({ msg:"Code ran successfully",output })   
    } catch (error) {
        return res.status(500).json({msg:"Internal Server Error",error})
    }
}
export const shareCode = async(req,res)=>{
    const { language,code,input } = req.body
    const data = JSON.stringify({
        code,
        input,
        language
    })
    try {
        const response= await axios.post(process.env.apiurl,data,{
            headers:{
                "Content-type":"application/json"
            }
        })
        const { output } = response.data
        const _id = shortid.generate()
        const codeData = await Codes.create({ ...req.body,output,_id })
        return res.status(200).json({ msg:"Link generated successfully",output,codeData })   
    } catch (error) {
        return res.status(500).json({msg:"Internal Server Error",error})
    }
}
export const updateCode = async(req,res)=>{
    const id = req.params.id
    const { language,code,input } = req.body
    const data = JSON.stringify({
        code,
        input,
        language
    })
    try {
        const response= await axios.put(process.env.apiurl,data,{
            headers:{
                "Content-type":"application/json"
            }
        })
        const { output } = response.data
        const updatedAt = new Date
        const codeData = await Codes.findByIdAndUpdate(id,{ ...req.body,output,updatedAt },{new:true,runValidators:true})
        return res.status(201).json({ msg:"Link Updated successfully",output,codeData })   
    } catch (error) {
        return res.status(500).json({msg:"Internal Server Error",error})
    }
}
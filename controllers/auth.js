import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import User from "../models/User.js"
export const signup = async(req,res)=>{
    const { body } = req
    let { email,password } = body
    const user = await User.findOne({ email })
    if(user) return res.status(401).json({msg:"User Exists With That Email"})
    password = await bcrypt.hash(password,8)
    const token = jwt.sign(email,process.env.secret)
    const userData = await User.create({...body,password})
    return res.status(201).json({msg:"SignedUp Successfully",token})
}
export const signin = async(req,res)=>{
    const { body } = req
    const { email,password } = body
    const user = await User.findOne({ email })
    if(!user)return res.status(401).json({msg:"User not exists"})
    const match = await bcrypt.compare(password,user.password)
    if(!match)return res.status(401).json({msg:"Wrong Password"})
    const token = jwt.sign(email,process.env.secret)
    return res.status(201).json({msg:"LoggedIn Successfully",token})
}
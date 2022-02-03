import jwt from "jsonwebtoken"
import User from "../models/User.js"
export default async (req,res,next)=>{
    const token = req.header("Authorization")
    if(!token)return res.status(403).json({msg:"Not Authorized"})
    try {
        const email = jwt.verify(token,process.env.secret)
        const user = await User.findOne({ email })
        if(!user)return res.status(200).json({msg:"No user with that email"})
        res.locals.user=user
        next()
    } catch (error) {
        return res.status(500).json({
            msg:"Internal Server Error",
            error
        })
    }
}
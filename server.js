import express from "express"
import db_connect from "./db_connect.js"
import { config } from "dotenv"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import codeRoutes from "./routes/code.js"
config()
db_connect()
const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
    credentials:true,
    optionsSuccessStatus:200
}))
app.use(authRoutes)
app.use(codeRoutes)
app.listen(5000,()=>console.log(`Server running on ${port}`))
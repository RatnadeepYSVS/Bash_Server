import { Router } from "express";
import { getUser, signin, signup } from "../controllers/auth.js";
import auth from "../middlewares/auth.js";
const router = Router()
router.post("/signup",signup)
router.post("/signin",signin)
router.get("/getuser",auth,getUser)
export default router
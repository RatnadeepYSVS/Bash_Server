import { Router } from "express";
import { getCode, getUserCodes, runCode, saveCode, shareCode, updateCode } from "../controllers/code.js";
import auth from "../middlewares/auth.js"
const router = Router()
router.post("/runcode",runCode)
router.post("/sharecode",shareCode)
router.get("/viewcode/:id",getCode)
router.put("/updatecode/:id",updateCode)
router.post("/savecode",auth,saveCode)
router.get("/yourcodes",auth,getUserCodes)
export default router
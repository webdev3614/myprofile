import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import { verifyToken } from "../middleware";

const router = Router()

router.use("/auth",authRouter)
router.use("/user",verifyToken,userRouter)

export default router
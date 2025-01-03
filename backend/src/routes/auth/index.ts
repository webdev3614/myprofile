import { Router } from "express";
import {
    onSignup,
    onLogin
} from "../../controllers/auth";

const router = Router()
router.post("/signup",onSignup)
router.post("/login",onLogin)

export default router
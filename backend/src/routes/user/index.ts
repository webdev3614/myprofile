import { Router } from "express";
import {
    User
} from "../../controllers/user";

const router = Router()
router.get("/",User)

export default router
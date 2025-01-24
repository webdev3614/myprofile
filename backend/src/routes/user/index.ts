import { Router } from "express";
import {
    User
} from "../../controllers/user";
import email from "./email";

const router = Router()
router.get("/", User)
router.use("/:email", email)

export default router
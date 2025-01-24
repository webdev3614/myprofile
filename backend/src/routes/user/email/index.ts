import { Router } from "express";
import { Img } from "../../../controllers/user";
import multer from "multer";

const {
    create
} = Img;

let upload = multer({
    limits: {
        files: 1 * 1024 * 1024
    }
})

const router = Router({
    mergeParams: true
})
router.get("/img", Img.index)
router.post("/img", upload.single("file"), Img.create)

export default router
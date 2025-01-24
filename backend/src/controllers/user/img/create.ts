import { Response } from "express";
import mongoose from "mongoose";
import { AuthRequest } from "../../../libs";
import { GridFS } from "../../../libs";
import { User } from "../../../model";

export default (req: AuthRequest, res: Response) => {
    if (req.token) {
        const { email } = req.token
        const file = req.file
        if (file) {
            const file_name = `${email}${file.originalname.slice(file.originalname.lastIndexOf("."))}`
            const db = mongoose.connection.db
            if (db) {
                const gfs = new GridFS(db, "user_img")
                gfs.write_file(file_name, file.buffer, (err) => {
                    if (err) {
                        res.status(500).json({
                            msg: "It is failure to write file."
                        })
                    } else {
                        User.update({
                            email,
                            key: "img",
                            val: file_name
                        }).then((result: any) => {
                            res.status(result.state ? 200 : 500).json({
                                msg: result.msg
                            })
                        })
                    }
                })
            } else {
                res.status(500).json({
                    msg: "The db does not exist."
                })
            }
        } else {
            res.status(500).json({
                msg: "The file does not exist."
            })
        }
    } else {
        res.status(500).json({
            msg: "The token does not exist."
        })
    }
}
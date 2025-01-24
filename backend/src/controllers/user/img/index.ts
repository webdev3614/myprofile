import { Response } from "express";
import { AuthRequest, GridFS } from "../../../libs";
import create from "./create";
import mongoose from "mongoose";
import { User } from "../../../model";

const index = (req: AuthRequest, res: Response) => {
    if (req.token) {
        const { email } = req.token
        User.user(email).then((result) => {
            if (result.state) {
                const file_name = result.info.img
                const db = mongoose.connection.db
                if (db) {
                    const gfs = new GridFS(db, "user_img")
                    gfs.read_file(file_name, (err, buff) => {
                        if (err) {
                            res.status(500).json({
                                msg: "It is failure to download img."
                            })
                        } else {
                            res.status(200).end(buff)
                        }
                    })
                }
            } else {
                res.status(500).json({
                    msg: "The user does not exist."
                })
            }
        })
    } else {
        res.status(500).json({
            msg: "The token does not exist."
        })
    }
}

export default {
    create,
    index
}
import { Response } from "express";
import User from "../../model/user";
import { AuthRequest } from "../../libs";

export default (req: AuthRequest, res: Response) => {
    if (req.token) {
        const email = req.token.email;
        if (email) {
            User.user(email).then((result) => {
                if (result.state) {
                    res.status(200).json({
                        info: result.info
                    })
                } else {
                    res.status(409).json({
                        msg: result.msg
                    })
                }
            }).catch((err) => {
                res.status(500).json({
                    msg: `fire errors on Server:${err.msg}`
                })
            })
        } else {
            res.status(403).json({
                msg: "email does not exist."
            })
        }
    } else {
        res.status(403).json({
            msg: "The token does not exist."
        })
    }
}
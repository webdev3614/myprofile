import { Response } from "express";
import User from "../../model/user";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../../libs";

export default (req: AuthRequest, res: Response) => {
    const { email, password } = req.body;
    User.verify({
        email,
        password
    }).then((result) => {
        if (result.state) {
            if (req.secret) {
                const token = jwt.sign({ email }, req.secret, { expiresIn: 60 * 60 * 1000 });
                res.status(200).json({
                    token,
                    message: result.msg
                })
            } else {
                res.status(401).json({ message: "secret key doesn't exist" })
            }
        } else {
            res.status(409).json({ message: result.msg })
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: `fire errors on Server:${err.message}` })
    })
}
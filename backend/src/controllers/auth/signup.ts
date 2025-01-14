import { Request, Response } from "express";
import User from "../../model/user";

export default (req: Request, res: Response) => {
    const { first_name, last_name, email, password, confirm_password } = req.body
    if (first_name === "") {
        res.status(400).json({ message: "Please input first name." })
    } else if (last_name === "") {
        res.status(400).json({ message: "Please input last name." })
    } else if (email === "") {
        res.status(400).json({ message: "Please input email." })
    } else if (password === "") {
        res.status(400).json({ message: "Please input password." })
    } else if (confirm_password === "") {
        res.status(400).json({ message: "Please input confirm password." })
    } else if (password !== confirm_password) {
        res.status(400).json({ message: "Password is incorrect." })
    } else {
        User.add({
            first_name,
            last_name,
            email,
            password
        }).then((result)=>{
            if(result.state){
                res.status(200).json({
                    message:result.msg
                })
            }else{
                res.status(409).json({
                    message:result.msg
                })
            }
        }).catch((err)=>{
            res.status(500).json({
                message:`fire errors on Server:${err.message}`
            })
        })
    }
}
import { Request, Response } from "express";
import User from "../../model/user";

export default (req: Request, res: Response) => {
    const { email, password } = req.body;
    User.verify({
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
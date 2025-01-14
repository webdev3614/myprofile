import { Response } from "express";
import User from "../../model/user";
import { AuthRequest } from "../../libs";

export default (req: AuthRequest, res: Response) => {
    if(req.token){
        const email = req.token.email;
        if(email){
            User.user({
                email
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
        }else{
            res.status(403).json({
                message:"email does not exist."
            })
        }
    }else{
        res.status(403).json({
            message:"token does not exist."
        })
    }
}
import { NextFunction, Response } from "express";
import { AuthRequest } from "../libs";

const SECRET: string = process.env.JWT_SECRET || 'supersecretkey';

const secret = (req: AuthRequest, res: Response, next: NextFunction) => {
    req.secret = SECRET;
    if (req.secret) {
        next();
    } else {
        res.status(401).json({ message: "secret key doesn't exist" })
    }
}

export {
    secret
}
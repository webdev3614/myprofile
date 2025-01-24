import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AuthRequest } from "../libs";

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (token && req.secret) {
        jwt.verify(token, req.secret, (err, decoded) => {
            if (err) {
                res.status(401).json({ msg: 'Invalid or expired token' });
            } else {
                req.token = decoded as JwtPayload;  // Attach user to request
                next();
            }
        });
    } else {
        res.status(401).json({ msg: 'No token provided' });
    }
};

export {
    verifyToken
};

import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

// Extend Request to include user
interface AuthRequest extends Request {
    token?: JwtPayload;
    secret?: string
}

export {
    AuthRequest
}
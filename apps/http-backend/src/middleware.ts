import { JWT_SECRET } from "@repo/backend-common/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            userID?: string;
        }
    }
}
export function Middleware(req: Request, res: Response, next: NextFunction) {

    const token = req.headers["authorization"] ?? " ";
    console.log({ "token": token })

    const decoded = jwt.verify(token, JWT_SECRET)
    if (decoded) {
        req.userID = (decoded as any).userID;
        console.log((decoded as any).userID);

        next()
    }
    else {
        res.status(403).json({ message: "Unauthorised" })
    }
}
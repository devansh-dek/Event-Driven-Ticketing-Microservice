import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


interface UserPayload {
    id: string;
    email: string;
}

// modification to the Express Request interface
// to include currentUser property
// This allows us to access currentUser in the request object
// without TypeScript errors.
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload; // argument user property
        }
    }
}

// If logged in extract information
export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) =>{

    if(!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
        req.currentUser = payload as UserPayload;

    } catch (err) {
        console.error("JWT verification failed:", err);
    }
    next();


}
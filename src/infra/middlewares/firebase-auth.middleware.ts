import { Request, Response, NextFunction } from "express";
import { auth } from "firebase-admin"; 
import { UserDetails } from "../types/user-details.type";

async function firebaseAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return next(new Error('Unauthorized: Missing or invalid token.'));
    }

    const token = authorization.replace('Bearer ', '');

    try {
        const { uid, email } = await verifyToken(token);
        req.user = { uid, email } as UserDetails;
        next();
    } catch (error) {
        next(new Error(`Unauthorized: ${error.message}`));
    }
}

async function verifyToken(token: string): Promise<{ uid: string; email: string }> {
    const { uid, email } = await auth().verifyIdToken(token);
    return { uid, email };
}

export default firebaseAuthMiddleware;

import {NextFunction, Request, Response} from 'express';
import {httpUnauthorized} from '../services/httpResponsesService';
import {expressjwt} from 'express-jwt';

export const tokenDefined = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not deﬁned");
    }

    return expressjwt({ secret, algorithms: ["HS256"] }).unless({
        path: [
            // public routes that don't require authentication
            '/auth/login',
            '/users/register',
        ],
    });
}

export const isLogged = (req: Request, res: Response, next: NextFunction) => {
    const token = req.session.token;

    if (token) {
        next();
    } else {
        httpUnauthorized(res, 'Please login to access this ressource.');
    }
}
import {NextFunction, Request, Response} from 'express';
import {httpUnauthorized} from '../services/httpResponsesService';

export const isLogged = (req: Request, res: Response, next: NextFunction) => {
    const token = req.session?.token;

    if (token) {
        next();
    } else {
        httpUnauthorized(res, 'Please login to access this ressource.');
    }
}
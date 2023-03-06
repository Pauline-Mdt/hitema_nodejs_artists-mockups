import {NextFunction, Request, Response} from 'express';
import {httpBadRequest, httpInternalServerError, httpUnauthorized} from '../services/httpResponsesService';
import jwt from 'jsonwebtoken';

export const handleErrors = (err: jwt.JsonWebTokenError, req: Request, res:Response, next: NextFunction) => {
    // if (typeof err === 'string') {
    //     httpBadRequest(res, err);
    //     return;
    // }

    if (err.name === 'UnauthorizedError') {
        httpUnauthorized(res, 'You\'re not login : Invalid token.');
        return;
    }

    console.log(err);
    httpInternalServerError(res, err.message);
}
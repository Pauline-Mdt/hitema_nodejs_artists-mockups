import {NextFunction, Request, Response} from 'express';
import {httpBadRequest, httpInternalServerError, httpUnauthorized} from '../services/httpResponsesService';

export const handleErrors = (err: any, req: Request, res:Response, next: NextFunction) => {
    if (typeof err === 'string') {
        httpBadRequest(res, err);
        return;
    }

    if (err.status === 401) {
        httpUnauthorized(res, 'You\'re not login : Invalid token.');
        return;
    }

    httpInternalServerError(res, err.message);
}
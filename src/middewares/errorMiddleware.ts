import {NextFunction, Request, Response} from 'express';
import {httpBadRequest, httpInternalServerError, httpUnauthorized} from '../services/httpResponsesService';

export const handleErrors = (err: any, req: Request, res:Response, next: NextFunction) => {
    if (err.status === 400) {
        httpBadRequest(res, err.message);
        return;
    }

    if (err.status === 401) {
        httpUnauthorized(res, 'You\'re not login - Invalid token: ' + err.message);
        return;
    }

    console.error(err);
    httpInternalServerError(res, err.message);
}
import {NextFunction, Request, Response} from 'express';
import {httpForbidden} from '../services/httpResponsesService';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const userRole: string = req.auth?.role;

    if (userRole === 'admin') {
        next();
    } else {
        httpForbidden(res);
    }
}

export const isNotAdmin = (req: Request, res: Response, next: NextFunction) => {
    const userRole: string = req.auth?.role;

    if (userRole !== 'admin') {
        next();
    } else {
        httpForbidden(res);
    }
}

export const isManager = (req: Request, res: Response, next: NextFunction) => {
    const userRole: string = req.auth?.role;

    if (userRole === 'manager') {
        next();
    } else {
        httpForbidden(res);
    }
}

export const isArtist = (req: Request, res: Response, next: NextFunction) => {
    const userRole: string = req.auth?.role;

    if (userRole === 'artist') {
        next();
    } else {
        httpForbidden(res);
    }
}

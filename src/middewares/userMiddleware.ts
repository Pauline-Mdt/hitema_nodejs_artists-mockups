import {NextFunction, Request, Response} from 'express';
import {httpForbidden} from '../services/httpResponsesService';
import {Mockup} from '../models/IMockup';
import {User} from '../models/IUser';

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

export const isNotArtist = (req: Request, res: Response, next: NextFunction) => {
    const userRole: string = req.auth?.role;

    if (userRole !== 'artist') {
        next();
    } else {
        httpForbidden(res);
    }
}

export const artistIsNotBanned = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.auth?.id);

    if (user && !user.banned) {
        next();
    } else {
        httpForbidden(res);
    }
}

export const isOwnerOrManagerOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const userRole: string = req.auth?.role;
    const userId: string = req.auth?.id;
    const mockup = await Mockup.findById(req.params.id);

    if (userId === mockup?.userId.toString() || userRole === 'manager' || userRole === 'admin') {
        next();
    } else {
        httpForbidden(res);
    }
}
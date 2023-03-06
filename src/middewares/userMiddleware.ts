import {NextFunction, Request, Response} from 'express';
import {httpForbidden} from '../services/httpResponsesService';
import {IMockup} from '../models/IMockup';
import MockupController from '../controllers/MockupController';

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

export const isOwnerOrManager = (req: Request, res: Response, next: NextFunction) => {
    const userRole: string = req.auth?.role;
    const userId: string = req.auth?.id;
    const mockupId: string = req.params.id;
    const mockup: IMockup = MockupController.mockups.filter((mockup) => mockup.id === mockupId)[0];

    if (userRole === 'manager' || userId === mockup.userId) {
        next();
    } else {
        httpForbidden(res);
    }
}
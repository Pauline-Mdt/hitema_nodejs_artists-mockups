import {CreateMockupSchema, IMockup, UpdateMockupSchema} from '../models/IMockup';
import {Request, Response} from 'express';
import * as crypto from 'crypto';
import {
    httpCreated, httpForbidden,
    httpNoContent,
    httpNotFound,
    httpOk,
    httpUnprocessableEntity,
} from '../services/httpResponsesService';
import {IUser} from '../models/IUser';
import UserController from './UserController';

class MockupController {
    static mockups: IMockup[] = [];

    static createMockup = (req: Request, res: Response) => {
        const userID: string = req.auth?.id;
        const user: IUser = UserController.users.filter((user) => user.id === userID)[0];

        if (user.banned) {
            httpForbidden(res);
            return;
        }

        const newMockup: IMockup = {
            id: crypto.randomUUID(),
            url: req.body.url,
            title: req.body.title,
            validated: false,
            userId: req.body.userId,
        };
        const {error} = CreateMockupSchema.validate(newMockup);

        if (error) {
            httpUnprocessableEntity(res, error.message);
            return;
        }

        this.mockups.push(newMockup);

        httpCreated(res, newMockup);
    }

    static getAllMockups = (req: Request, res: Response) => {
        const userRole: string = req.auth?.role;
        const userId: string = req.auth?.id;

        if (userRole === 'manager' || userRole === 'admin') {
            httpOk(res, this.mockups);
        } else {
            httpOk(res, this.mockups.filter((mockup) => mockup.userId === userId));
        }
    }

    static getOneMockup = (req: Request, res: Response) => {
        const mockupId: string = req.params.id;
        const mockup = this.mockups.find((mockup) => mockup.id === mockupId);

        if (!mockup) {
            httpNotFound(res);
            return;
        }

        httpOk(res, mockup);
    }

    static updateMockup = (req: Request, res: Response) => {
        const mockupId: string = req.params.id;
        const mockup = this.mockups.find((mockup) => mockup.id === mockupId);

        if (!mockup) {
            httpNotFound(res);
            return;
        }

        const {error} = UpdateMockupSchema.validate(req.body);

        if (error) {
            httpUnprocessableEntity(res, error.message);
            return;
        }

        const updatedMockup = {
            ...mockup,
            ...req.body,
        };

        this.mockups.splice(this.mockups.indexOf(mockup), 1, updatedMockup);

        httpOk(res, updatedMockup);
    }

    static deleteMockup = (req: Request, res: Response) => {
        const mockupId: string = req.params.id;
        const mockup = this.mockups.find((mockup) => mockup.id === mockupId);

        if (!mockup) {
            httpNotFound(res);
            return;
        }

        this.mockups.splice(this.mockups.indexOf(mockup), 1);

        httpNoContent(res);
    }
}

export default MockupController;
import {CreateMockupSchema, IMockup, UpdateMockupSchema} from '../models/IMockup';
import {Request, Response} from 'express';
import * as crypto from 'crypto';
import {
    httpCreated,
    httpNoContent,
    httpNotFound,
    httpOk,
    httpUnprocessableEntity,
} from '../services/httpResponsesService';

class MockupController {
    static mockups: IMockup[] = [];

    static createMockup = (req: Request, res: Response) => {
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
        httpOk(res, this.mockups);
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
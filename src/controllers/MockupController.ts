import {CreateMockupSchema, Mockup, UpdateMockupSchema} from '../models/IMockup';
import {Request, Response} from 'express';
import {
    httpCreated,
    httpNoContent,
    httpNotFound,
    httpOk,
    httpUnprocessableEntity,
} from '../services/httpResponsesService';
import {User} from '../models/IUser';
import {checkSchemaValidity} from '../services/modelsService';

class MockupController {
    static createMockup = async (req: Request, res: Response) => {
        checkSchemaValidity(CreateMockupSchema, req.body, res);

        const ownerUser = await User.findById(req.body.userId);
        if (!ownerUser) {
            httpUnprocessableEntity(res, 'UserId is not valid.');
            return;
        }

        const newMockup = new Mockup({
            url: req.body.url,
            title: req.body.title,
            userId: ownerUser._id,
        });

        await newMockup.save();
        httpCreated(res, newMockup.toObject());
    }

    static getAllMockups = async (req: Request, res: Response) => {
        const userRole: string = req.auth?.role;
        const userId: string = req.auth?.id;
        const mockups = await Mockup.find();

        if (userRole === 'manager' || userRole === 'admin') {
            httpOk(res, mockups.map((mockup) => mockup.toObject()));
        } else {
            httpOk(res, mockups.filter((mockup) => mockup.userId.toString() === userId).map((mockup) => mockup.toObject()));
        }
    }

    static getOneMockup = async (req: Request, res: Response) => {
        const mockup = await Mockup.findById(req.params.id);

        if (!mockup) {
            httpNotFound(res);
            return;
        }

        httpOk(res, mockup);
    }

    static updateMockup = async (req: Request, res: Response) => {
        checkSchemaValidity(UpdateMockupSchema, req.body, res);

        const mockupId: string = req.params.id;
        const mockup = await Mockup.findById(mockupId);

        if (!mockup) {
            httpNotFound(res);
            return;
        }

        const updatedMockup = new Mockup({
            ...mockup,
            ...req.body,
        });

        await Mockup.findByIdAndUpdate(mockupId, updatedMockup);
        httpOk(res, updatedMockup.toObject());
    }

    static deleteMockup = async (req: Request, res: Response) => {
        const mockup = await Mockup.findByIdAndRemove(req.params.id);

        if (!mockup) {
            httpNotFound(res);
            return;
        }

        httpNoContent(res);
    }
}

export default MockupController;
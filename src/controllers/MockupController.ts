import {CreateMockupSchema, Mockup, UpdateMockupSchema} from '../models/IMockup';
import {Request, Response} from 'express';
import {
    httpCreated,
    httpNoContent,
    httpNotFound,
    httpOk, httpUnprocessableEntity,
} from '../services/httpResponsesService';

class MockupController {
    static createMockup = async (req: Request, res: Response) => {
        const {error} = CreateMockupSchema.validate(req.body);
        if (error) {
            httpUnprocessableEntity(res, error.message);
            return;
        }

        const newMockup = new Mockup({
            url: req.body.url,
            title: req.body.title,
            userId: req.auth?.id,
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
        const {error} = UpdateMockupSchema.validate(req.body);
        if (error) {
            httpUnprocessableEntity(res, error.message);
            return;
        }

        const mockup = await Mockup.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if (!mockup) {
            httpNotFound(res);
            return;
        }

        httpOk(res, mockup.toObject());
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
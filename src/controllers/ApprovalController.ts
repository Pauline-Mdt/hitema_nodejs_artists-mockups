import {Request, Response} from 'express';
import {Approval, CreateApprovalSchema, UpdateApprovalSchema} from '../models/IApproval';
import {
    httpCreated,
    httpNoContent,
    httpNotFound,
    httpOk,
    httpUnprocessableEntity,
} from '../services/httpResponsesService';
import {checkIfAllManagersGaveApproval, setMockupValidity} from '../services/mockupValidationService';
import {Mockup} from '../models/IMockup';

class ApprovalController {
    static createApproval = async (req: Request, res: Response) => {
        const {error} = CreateApprovalSchema.validate(req.body);
        if (error) {
            httpUnprocessableEntity(res, error.message);
            return;
        }

        const mockup = await Mockup.findById(req.body.mockupId);
        if (!mockup) {
            httpUnprocessableEntity(res, 'MockupId is not valid.');
            return;
        }

        const approvals = await Approval.find({
            mockupId: mockup._id,
            userId: req.auth?.id,
        });
        if (approvals.length > 0) {
            httpUnprocessableEntity(res, 'You already gave an approval for this mockup.');
            return;
        }

        const newApproval = new Approval({
            mockupId: mockup._id,
            userId: req.auth?.id,
            approved: req.body.approved,
            comment: req.body.comment,
        });

        await newApproval.save();
        if (await checkIfAllManagersGaveApproval(newApproval.mockupId)) {
            await setMockupValidity(newApproval.mockupId);
        }
        httpCreated(res, newApproval.toObject());
    }

    static getAllApprovals = async (req: Request, res: Response) => {
        const approvals = await Approval.find();
        httpOk(res, approvals.map((approval) => approval.toObject()));
    }

    static getOneApproval = async (req: Request, res: Response) => {
        const approval = await Approval.findById(req.params.id);

        if (!approval) {
            httpNotFound(res);
            return;
        }

        httpOk(res, approval);
    }

    static updateApproval = async (req: Request, res: Response) => {
        const {error} = UpdateApprovalSchema.validate(req.body);
        if (error) {
            httpUnprocessableEntity(res, error.message);
            return;
        }

        const approval = await Approval.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if (!approval) {
            httpNotFound(res);
            return;
        }

        if (await checkIfAllManagersGaveApproval(approval.mockupId)) {
            setMockupValidity(approval.mockupId);
        }
        httpOk(res, approval.toObject());
    }

    static deleteApproval = async (req: Request, res: Response) => {
        const approval = await Approval.findByIdAndRemove(req.params.id);

        if (!approval) {
            httpNotFound(res);
            return;
        }

        httpNoContent(res);
    }
}

export default ApprovalController;
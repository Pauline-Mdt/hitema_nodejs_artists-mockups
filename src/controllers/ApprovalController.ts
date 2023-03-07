import {Request, Response} from 'express';
import {Approval, CreateApprovalSchema, UpdateApprovalSchema} from '../models/IApproval';
import {
    httpCreated,
    httpNoContent,
    httpNotFound,
    httpOk,
    httpUnprocessableEntity,
} from '../services/httpResponsesService';
import {User} from '../models/IUser';
import {checkIfAllManagersGaveApproval, checkSchemaValidity, setMockupValidity} from '../services/modelsService';

class ApprovalController {
    static createApproval = async (req: Request, res: Response) => {
        checkSchemaValidity(CreateApprovalSchema, req.body, res);

        const user = await User.findById(req.body.userId);
        if (!user) {
            httpUnprocessableEntity(res, 'UserId is not valid.');
            return;
        }

        const mockup = await User.findById(req.body.mockupId);
        if (!mockup) {
            httpUnprocessableEntity(res, 'MockupId is not valid.');
            return;
        }

        const newApproval = new Approval({
            mockupId: mockup._id,
            userId: user._id,
            approved: req.body.approved,
            comment: req.body.comment,
        });

        await newApproval.save();
        if (await checkIfAllManagersGaveApproval(newApproval.mockupId)) {
            setMockupValidity(newApproval.mockupId);
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
        checkSchemaValidity(UpdateApprovalSchema, req.body, res);

        const approvalId: string = req.params.id;
        const approval = await Approval.findById(approvalId);

        if (!approval) {
            httpNotFound(res);
            return;
        }

        const updatedApproval = new Approval({
            ...approval,
            ...req.body,
        });

        await Approval.findByIdAndUpdate(approvalId, updatedApproval);
        if (await checkIfAllManagersGaveApproval(updatedApproval.mockupId)) {
            setMockupValidity(updatedApproval.mockupId);
        }
        httpOk(res, updatedApproval.toObject());
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
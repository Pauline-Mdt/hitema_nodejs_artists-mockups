import {Request, Response} from 'express';
import {CreateApprovalSchema, IApproval, UpdateApprovalSchema} from '../models/IApproval';
import * as crypto from 'crypto';
import {
    httpCreated,
    httpNoContent,
    httpNotFound,
    httpOk,
    httpUnprocessableEntity,
} from '../services/httpResponsesService';

class ApprovalController {
    static approvals: IApproval[] = [];

    static createApproval = (req: Request, res: Response) => {
        const newApproval: IApproval = {
            id: crypto.randomUUID(),
            mockupId: req.body.mockupId,
            userId: req.body.userId,
            approved: req.body.approved,
            comment: req.body.comment,
        }
        const {error} = CreateApprovalSchema.validate(newApproval);

        if (error) {
            httpUnprocessableEntity(res, error.message);
            return;
        }

        this.approvals.push(newApproval);

        httpCreated(res, newApproval);
    }

    static getAllApprovals = (req: Request, res: Response) => {
        httpOk(res, this.approvals);
    }

    static getOneApproval = (req: Request, res: Response) => {
        const approvalId: string = req.params.id;
        const approval = this.approvals.find((approval) => approval.id === approvalId);

        if (!approval) {
            httpNotFound(res);
            return;
        }

        httpOk(res, approval);
    }

    static updateApproval = (req: Request, res: Response) => {
        const approvalId: string = req.params.id;
        const approval = this.approvals.find((approval) => approval.id === approvalId);

        if (!approval) {
            httpNotFound(res);
            return;
        }

        const {error} = UpdateApprovalSchema.validate(req.body);

        if (error) {
            httpUnprocessableEntity(res, error.message);
            return;
        }

        const updatedApproval: IApproval = {
            ...approval,
            ...req.body,
        }

        this.approvals.splice(this.approvals.indexOf(approval), 1, updatedApproval);

        httpOk(res, updatedApproval);
    }

    static deleteApproval = (req: Request, res: Response) => {
        const approvalId: string = req.params.id;
        const approval = this.approvals.find((approval) => approval.id === approvalId);

        if (!approval) {
            httpNotFound(res);
            return;
        }

        this.approvals.splice(this.approvals.indexOf(approval), 1);

        httpNoContent(res);
    }
}

export default ApprovalController;
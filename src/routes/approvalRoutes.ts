import {Router} from 'express';
import ApprovalController from '../controllers/ApprovalController';

const approvalRoutes = Router();

approvalRoutes.post('', ApprovalController.createApproval);
approvalRoutes.get('', ApprovalController.getAllApprovals);
approvalRoutes.get('/:id', ApprovalController.getOneApproval);
approvalRoutes.put('/:id', ApprovalController.updateApproval);
approvalRoutes.delete('/:id', ApprovalController.deleteApproval);

export default approvalRoutes;
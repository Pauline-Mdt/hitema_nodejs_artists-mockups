import {Router} from 'express';
import ApprovalController from '../controllers/ApprovalController';
import {isManager, isNotArtist, isOwnerApprovalOrAdmin} from '../middewares/userMiddleware';

const approvalsRoutes = Router();

approvalsRoutes.post('', isManager, ApprovalController.createApproval);
approvalsRoutes.get('', isNotArtist, ApprovalController.getAllApprovals);
approvalsRoutes.get('/:id', isOwnerApprovalOrAdmin, ApprovalController.getOneApproval);
approvalsRoutes.put('/:id', isOwnerApprovalOrAdmin, ApprovalController.updateApproval);
approvalsRoutes.delete('/:id', isOwnerApprovalOrAdmin, ApprovalController.deleteApproval);

export default approvalsRoutes;
import {Router} from 'express';
import ApprovalController from '../controllers/ApprovalController';
import {isNotArtist} from '../middewares/userMiddleware';

const approvalRoutes = Router();

approvalRoutes.post('', isNotArtist, ApprovalController.createApproval);
approvalRoutes.get('', isNotArtist, ApprovalController.getAllApprovals);
approvalRoutes.get('/:id', isNotArtist, ApprovalController.getOneApproval);
approvalRoutes.put('/:id', isNotArtist, ApprovalController.updateApproval);
approvalRoutes.delete('/:id', isNotArtist, ApprovalController.deleteApproval);

export default approvalRoutes;
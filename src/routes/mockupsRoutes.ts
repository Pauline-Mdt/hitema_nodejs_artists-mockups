import express from 'express';
import MockupController from '../controllers/MockupController';
import {isNotAdmin, isOwnerOrManager} from '../middewares/userMiddleware';

const mockupsRoutes = express.Router();

mockupsRoutes.post('', isNotAdmin, MockupController.createMockup);
mockupsRoutes.get('', MockupController.getAllMockups);
mockupsRoutes.get('/:id', isOwnerOrManager, MockupController.getOneMockup);
mockupsRoutes.put('/:id', isOwnerOrManager, MockupController.updateMockup);
mockupsRoutes.delete('/:id', isOwnerOrManager, MockupController.deleteMockup);

export default mockupsRoutes;
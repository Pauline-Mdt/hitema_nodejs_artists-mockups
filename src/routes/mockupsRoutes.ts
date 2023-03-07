import express from 'express';
import MockupController from '../controllers/MockupController';
import {isNotAdmin, isOwnerOrManagerOrAdmin} from '../middewares/userMiddleware';

const mockupsRoutes = express.Router();

mockupsRoutes.post('', isNotAdmin, MockupController.createMockup);
mockupsRoutes.get('', MockupController.getAllMockups);
mockupsRoutes.get('/:id', isOwnerOrManagerOrAdmin, MockupController.getOneMockup);
mockupsRoutes.put('/:id', isOwnerOrManagerOrAdmin, MockupController.updateMockup);
mockupsRoutes.delete('/:id', isOwnerOrManagerOrAdmin, MockupController.deleteMockup);

export default mockupsRoutes;
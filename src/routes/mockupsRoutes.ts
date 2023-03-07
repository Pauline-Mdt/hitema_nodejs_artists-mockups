import express from 'express';
import MockupController from '../controllers/MockupController';
import {artistIsNotBanned, isNotAdmin, isOwnerOrManagerOrAdmin} from '../middewares/userMiddleware';

const mockupsRoutes = express.Router();

mockupsRoutes.post('', isNotAdmin, artistIsNotBanned, MockupController.createMockup);
mockupsRoutes.get('', MockupController.getAllMockups);
mockupsRoutes.get('/:id', isOwnerOrManagerOrAdmin, MockupController.getOneMockup);
mockupsRoutes.put('/:id', isOwnerOrManagerOrAdmin, artistIsNotBanned, MockupController.updateMockup);
mockupsRoutes.delete('/:id', isOwnerOrManagerOrAdmin, MockupController.deleteMockup);

export default mockupsRoutes;
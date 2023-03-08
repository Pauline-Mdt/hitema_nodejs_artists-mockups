import express from 'express';
import MockupController from '../controllers/MockupController';
import {artistIsNotBanned, isArtist, isOwnerMockupOrAdmin} from '../middewares/userMiddleware';

const mockupsRoutes = express.Router();

mockupsRoutes.post('', isArtist, artistIsNotBanned, MockupController.createMockup);
mockupsRoutes.get('', MockupController.getAllMockups);
mockupsRoutes.get('/:id', isOwnerMockupOrAdmin, MockupController.getOneMockup);
mockupsRoutes.put('/:id', isOwnerMockupOrAdmin, artistIsNotBanned, MockupController.updateMockup);
mockupsRoutes.delete('/:id', isOwnerMockupOrAdmin, MockupController.deleteMockup);

export default mockupsRoutes;
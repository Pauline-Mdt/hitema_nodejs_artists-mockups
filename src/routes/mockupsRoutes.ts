import express from 'express';
import MockupController from '../controllers/MockupController';

const mockupsRoutes = express.Router();

mockupsRoutes.post('', MockupController.createMockup);
mockupsRoutes.get('', MockupController.getAllMockups);
mockupsRoutes.get('/:id', MockupController.getOneMockup);
mockupsRoutes.put('/:id', MockupController.updateMockup);
mockupsRoutes.delete('/:id', MockupController.deleteMockup);

export default mockupsRoutes;
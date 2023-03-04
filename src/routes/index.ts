import express from 'express';
import mockupsRoutes from './mockupsRoutes';
import approvalRoutes from './approvalRoutes';

const routes = express.Router();

routes.use('/mockups', mockupsRoutes);
routes.use('/approvals', approvalRoutes);

export default routes;
import express from 'express';
import mockupsRoutes from './mockupsRoutes';
import approvalRoutes from './approvalRoutes';
import usersRoutes from './usersRoutes';
import authRoutes from './authRoutes';

const routes = express.Router();

routes.use('/mockups', mockupsRoutes);
routes.use('/approvals', approvalRoutes);
routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);

export default routes;
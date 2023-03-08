import express from 'express';
import mockupsRoutes from './mockupsRoutes';
import approvalsRoutes from './approvalsRoutes';
import usersRoutes from './usersRoutes';
import authRoutes from './authRoutes';

const routes = express.Router();

routes.get('', (req, res) => {
    res.send('Connected to API.')
});
routes.use('/mockups', mockupsRoutes);
routes.use('/approvals', approvalsRoutes);
routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);

export default routes;
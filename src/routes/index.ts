import express from 'express';
import mockupsRoutes from './mockupsRoutes';

const routes = express.Router();

routes.use('/mockups', mockupsRoutes);

export default routes;
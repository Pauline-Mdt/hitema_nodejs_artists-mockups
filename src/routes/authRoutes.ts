import {Router} from 'express';
import AuthController from '../controllers/AuthController';

const authRoutes = Router();

authRoutes.post('/login', AuthController.login);
authRoutes.get('/current', AuthController.current);
authRoutes.get('/logout', AuthController.logout);

export default authRoutes;
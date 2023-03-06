import {Router} from 'express';
import UserController from '../controllers/UserController';

const usersRoutes = Router();

usersRoutes.post('/register', UserController.createArtist);
usersRoutes.post('', UserController.createManager);
usersRoutes.get('', UserController.getAllUsers);
usersRoutes.get('/current', UserController.getCurrentUser);
usersRoutes.get('/:id', UserController.getOneUser);
usersRoutes.put('/:id', UserController.updateUser);
usersRoutes.put('/:id/admin', UserController.updateAdmin);
usersRoutes.put('/:id/ban', UserController.banUser);
usersRoutes.delete('/:id', UserController.deleteUser);

export default usersRoutes;
import {Router} from 'express';
import UserController from '../controllers/UserController';
import {isAdmin} from '../middewares/userMiddleware';

const usersRoutes = Router();

usersRoutes.post('/register', UserController.createArtist);
usersRoutes.post('', isAdmin, UserController.createManager);
usersRoutes.get('/current', UserController.getCurrentUser);
usersRoutes.get('', UserController.getAllUsers);
usersRoutes.get('/:id', UserController.getOneUser);
usersRoutes.put('/:id', UserController.updateUser);
usersRoutes.put('/:id/admin', isAdmin, UserController.updateAdmin);
usersRoutes.put('/:id/ban', isAdmin, UserController.banUser);
usersRoutes.delete('/:id', isAdmin, UserController.deleteUser);

export default usersRoutes;
import {Router} from 'express';
import UserController from '../controllers/UserController';
import {isAdmin, isCurrentUserOrAdmin} from '../middewares/userMiddleware';

const usersRoutes = Router();

usersRoutes.post('/register', UserController.createArtist);
usersRoutes.post('/manager', isAdmin, UserController.createManager);
usersRoutes.get('', UserController.getAllUsers);
usersRoutes.get('/current', UserController.getCurrentUser);
usersRoutes.get('/:id', UserController.getOneUser);
usersRoutes.put('/artist/:id', isCurrentUserOrAdmin, UserController.updateArtist);
usersRoutes.put('/manager/:id', isCurrentUserOrAdmin, UserController.updateManager);
usersRoutes.put('/admin', isAdmin, UserController.updateAdmin);
usersRoutes.put('/ban/:id', isAdmin, UserController.banArtist);
usersRoutes.delete('/:id', isAdmin, UserController.deleteUser);

export default usersRoutes;
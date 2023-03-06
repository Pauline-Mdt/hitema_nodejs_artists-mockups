import {Request, Response} from 'express';
import {IUserLogin, UserLoginSchema} from '../models/IUserLogin';
import {
    httpBadRequest, httpNoContent,
    httpNotFound, httpOk,
    httpUnauthorized,
} from '../services/httpResponsesService';
import UserController from './UserController';
import {gererateToken} from '../services/jwtService';
import '../models/ISession';

class AuthController {
    static login(req: Request, res: Response) {
        const userToLogin: IUserLogin = {
            email: req.body.email,
            password: req.body.password,
        }

        const {error} = UserLoginSchema.validate(req.body);
        if (error) {
            httpBadRequest(res, error.message);
            return;
        }

        const user = UserController.users.filter((user) => user.email === userToLogin.email)[0];
        if (!user) {
            httpNotFound(res);
            return;
        }

        if (user.password !== userToLogin.password) {
            httpUnauthorized(res, 'Wrong password.');
            return;
        }

        const token = gererateToken(user);
        req.session.token = token;
        req.session.user = {
            id: user.id,
            role: user.role,
        };
        httpOk(res, {
            token,
            user,
        });
    }

    static current(req: Request, res: Response) {
        const user = UserController.users.filter((user) => user.id === req.session.user?.id)[0];
        if (!user) {
            httpNotFound(res);
            return;
        }

        httpOk(res, user);
    }

    static logout(req: Request, res: Response) {
        req.session.token = undefined;
        req.session.user = undefined;
        req.session.destroy(() => {
            console.log('Session destroyed');
        });
        httpNoContent(res);
    }
}

export default AuthController;
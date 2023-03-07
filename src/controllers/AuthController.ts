import {Request, Response} from 'express';
import {IUserLogin, UserLoginSchema} from '../models/IUserLogin';
import {
    httpBadRequest, httpNoContent,
    httpNotFound, httpOk,
    httpUnauthorized,
} from '../services/httpResponsesService';
import UserController from './UserController';
import {gererateToken} from '../services/jwtService';
import {comparePassword} from '../services/hashService';
import {removePassword} from '../services/passwordService';

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

        if (!comparePassword(userToLogin.password, user.password)) {
            httpUnauthorized(res, 'Wrong password.');
            return;
        }

        httpOk(res, {
            token: gererateToken(user),
            user: removePassword(user),
        });
    }

    static logout(req: Request, res: Response) {
        httpNoContent(res);
    }
}

export default AuthController;
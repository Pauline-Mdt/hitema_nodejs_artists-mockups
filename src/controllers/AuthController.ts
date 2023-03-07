import {Request, Response} from 'express';
import {IUserLogin, UserLoginSchema} from '../models/IUserLogin';
import {
    httpBadRequest, httpNoContent,
    httpNotFound, httpOk,
    httpUnauthorized,
} from '../services/httpResponsesService';
import {gererateToken} from '../services/jwtService';
import {comparePassword} from '../services/hashService';
import {removePassword} from '../services/passwordService';
import {User} from '../models/IUser';

class AuthController {
    static async login(req: Request, res: Response) {
        const {error} = UserLoginSchema.validate(req.body);
        if (error) {
            httpBadRequest(res, error.message);
            return;
        }

        const userToLogin: IUserLogin = {
            email: req.body.email,
            password: req.body.password,
        }
        const user = await User.findOne({email: userToLogin.email});

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
            user: removePassword(user.toObject()),
        });
    }

    static logout(req: Request, res: Response) {
        httpNoContent(res);
    }
}

export default AuthController;
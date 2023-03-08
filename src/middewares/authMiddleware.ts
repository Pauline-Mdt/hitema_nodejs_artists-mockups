import {expressjwt} from 'express-jwt';
import {JWT_SECRET} from '../config';

export const tokenDefined = () => {
    const secret = JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not deﬁned');
    }

    return expressjwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // Public routes that don't require authentication
            '/',
            '/auth/login',
            '/users/register',
        ],
    });
}
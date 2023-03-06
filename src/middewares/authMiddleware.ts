import {expressjwt} from 'express-jwt';

export const tokenDefined = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not deﬁned");
    }

    return expressjwt({ secret, algorithms: ["HS256"] }).unless({
        path: [
            // Public routes that don't require authentication
            '/',
            '/auth/login',
            '/users/register',
        ],
    });
}
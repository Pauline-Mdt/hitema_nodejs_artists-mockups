import jwt from 'jsonwebtoken';
import {IUser} from '../models/IUser';

export const gererateToken = (user: IUser) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        (process.env.JWT_SECRET as jwt.Secret),
        {
            expiresIn: '7d',
        }
    );
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, (process.env.JWT_SECRET as jwt.Secret));
}
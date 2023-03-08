import jwt from 'jsonwebtoken';
import {IUser} from '../models/IUser';
import {JWT_SECRET} from '../config';

export const gererateToken = (user: IUser) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        JWT_SECRET,
        {
            expiresIn: '7d',
        }
    );
}
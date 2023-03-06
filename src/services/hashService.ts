import * as crypto from 'crypto';
import {IPassword} from '../models/IPassword';

const generateSalt = (rounds = 12): string => {
    return crypto.randomBytes(Math.ceil(rounds / 2))
        .toString('hex')
        .slice(0, rounds);
}

const hasher = (password: string, salt: string): string => {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
}

export const hashPassword = (password: string): IPassword => {
    const salt = generateSalt();
    return {
        password: hasher(password, salt),
        salt,
    };
}

export const comparePassword = (password: string, storedPassword: IPassword): boolean => {
    return hasher(password, storedPassword.salt) === storedPassword.password;
}
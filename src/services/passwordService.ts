import {IUser} from '../models/IUser';

export const removePassword = (user: IUser) => {
    const {password, ...userWithoutPassword} = user;
    return userWithoutPassword;
}
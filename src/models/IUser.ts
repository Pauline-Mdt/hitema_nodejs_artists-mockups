import joi from 'joi';
import {IPassword} from './IPassword';
import mongoose from 'mongoose';

export const CreateUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().alphanum().required(),
    pseudo: joi.string().alphanum().optional(),
}).required();

export const UpdateUserSchema = joi.object({
    email: joi.string().email().optional(),
    password: joi.string().alphanum().optional(),
    pseudo: joi.string().alphanum().optional(),
}).required();

export const UpdateAdminSchema = joi.object({
    password: joi.string().alphanum().required(),
}).required();

export interface IUser {
    _id?: string,
    role: 'admin' | 'manager' | 'artist',
    email: string,
    password: IPassword,
    pseudo?: string,
    banned?: boolean,
}

const userSchema = new mongoose.Schema<IUser>(
    {
    role: String,
    email: String,
    password: {
        password: String,
        salt: String,
    },
    pseudo: String,
    banned: Boolean,
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model<IUser>('User', userSchema);
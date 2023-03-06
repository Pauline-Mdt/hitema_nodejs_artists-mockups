import joi from 'joi';

export const CreateUserSchema = joi.object({
    id: joi.string().required(),
    role: joi.string().valid('admin', 'manager', 'artist').required(),
    email: joi.string().email().required(),
    password: joi.string().alphanum().required(),
    pseudo: joi.string().alphanum().optional(),
    banned: joi.boolean().optional(),
    inscriptionDate: joi.date().required(),
}).required();

export const UpdateUserSchema = joi.object({
    id: joi.string().optional(),
    role: joi.string().valid('admin', 'manager', 'artist').optional(),
    email: joi.string().email().optional(),
    password: joi.string().alphanum().optional(),
    pseudo: joi.string().alphanum().optional(),
    banned: joi.boolean().optional(),
    inscriptionDate: joi.date().optional(),
}).required();

export const UpdateAdminSchema = joi.object({
    password: joi.string().alphanum().required(),
}).required();

export interface IUser {
    id: string,
    role: 'admin' | 'manager' | 'artist',
    email: string,
    password: string,
    pseudo?: string,
    banned?: boolean,
    inscriptionDate: Date,
}
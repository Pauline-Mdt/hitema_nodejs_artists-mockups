import joi from 'joi';

export const UserLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().alphanum().required(),
}).required();

export interface IUserLogin {
    email: string;
    password: string;
}
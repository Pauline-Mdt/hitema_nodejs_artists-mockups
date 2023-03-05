import joi from 'joi';

export const UserLoginSchema = joi.object({
    email: joi.string().alphanum().required(),
    password: joi.string().alphanum().required(),
}).required();

export interface IUserLogin {
    email: string;
    password: string;
}
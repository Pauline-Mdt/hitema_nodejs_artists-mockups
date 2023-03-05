import joi from 'joi';

export const UserLoginSchema = joi.object({
    username: joi.string().alphanum().required(),
    password: joi.string().alphanum().required(),
}).required();

export interface IUserLogin {
    username: string;
    password: string;
}
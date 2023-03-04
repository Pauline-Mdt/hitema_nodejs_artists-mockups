import joi from 'joi';

export const CreateMockupSchema = joi.object({
    id: joi.string().required(),
    url: joi.string().required(),
    title: joi.string().required(),
    validated: joi.boolean().required(),
    userId: joi.string().required(),
}).required();

export const UpdateMockupSchema = joi.object({
    id: joi.string().optional(),
    url: joi.string().optional(),
    title: joi.string().optional(),
    validated: joi.boolean().optional(),
    userId: joi.string().optional(),
}).required();

export interface IMockup {
    id: string,
    url: string,
    title: string,
    validated: boolean,
    userId: string,
}
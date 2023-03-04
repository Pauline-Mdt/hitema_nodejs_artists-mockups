import joi from 'joi';

export const CreateApprovalSchema = joi.object({
    id: joi.string().required(),
    mockupId: joi.string().required(),
    userId: joi.string().required(),
    approved: joi.boolean().required(),
    comment: joi.string().required(),
}).required();

export const UpdateApprovalSchema = joi.object({
    id: joi.string().optional(),
    mockupId: joi.string().optional(),
    userId: joi.string().optional(),
    approved: joi.boolean().optional(),
    comment: joi.string().optional(),
}).required();

export interface IApproval {
    id: string,
    mockupId: string,
    userId: string,
    approved: boolean,
    comment: string,
}
import joi from 'joi';
import mongoose, {Schema, Types} from 'mongoose';

export const CreateApprovalSchema = joi.object({
    mockupId: joi.string().hex().length(24).required(),
    approved: joi.boolean().required(),
    comment: joi.string().required(),
}).required();

export const UpdateApprovalSchema = joi.object({
    approved: joi.boolean().optional(),
    comment: joi.string().optional(),
}).required();

export interface IApproval {
    _id?: string,
    mockupId: Types.ObjectId
    userId: Types.ObjectId,
    approved: boolean,
    comment: string,
}

const approvalSchema = new mongoose.Schema<IApproval>(
    {
    mockupId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    approved: Boolean,
    comment: String,
    },
    {
        timestamps: true
    });

export const Approval = mongoose.model<IApproval>('Approval', approvalSchema);
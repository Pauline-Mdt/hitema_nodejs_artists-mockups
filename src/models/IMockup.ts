import joi from 'joi';
import mongoose, {Schema, Types} from 'mongoose';

export const CreateMockupSchema = joi.object({
    url: joi.string().required(),
    title: joi.string().required(),
    userId: joi.string().required(),
}).required();

export const UpdateMockupSchema = joi.object({
    url: joi.string().optional(),
    title: joi.string().optional(),
    userId: joi.string().optional(),
}).required();

export interface IMockup {
    _id?: string,
    url: string,
    title: string,
    validated?: boolean,
    userId: Types.ObjectId,
}

const mockupSchema = new mongoose.Schema<IMockup>(
    {
    url: String,
    title: String,
    validated: Boolean,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    },
    {
        timestamps: true
    });

export const Mockup = mongoose.model<IMockup>('Mockup', mockupSchema);
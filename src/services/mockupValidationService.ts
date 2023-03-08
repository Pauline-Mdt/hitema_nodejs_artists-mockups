import {Types} from 'mongoose';
import {User} from '../models/IUser';
import {Approval} from '../models/IApproval';
import {Mockup} from '../models/IMockup';

export const checkIfAllManagersGaveApproval = async (mockupId: Types.ObjectId) => {
    const numberOfManagers = await User.countDocuments({role: 'manager'});
    const numberOfApprovals = await Approval.countDocuments({mockupId});

    return numberOfManagers === numberOfApprovals;
}

export const setMockupValidity = async (mockupId: Types.ObjectId) => {
    const approvals = await Approval.find({mockupId});
    let isApproved = 0, isRejected = 0;

    approvals.forEach((approval) => {
        approval.approved ?
            isApproved++
            : isRejected++;
    });

    isApproved > isRejected ?
        await Mockup.findByIdAndUpdate(mockupId, {validated: true})
        : await Mockup.findByIdAndUpdate(mockupId, {validated: false});
}
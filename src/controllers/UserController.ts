import {CreateUserSchema, UpdateAdminSchema, UpdateUserSchema, User} from '../models/IUser';
import {Request, Response} from 'express';
import {
    httpCreated, httpNoContent,
    httpNotFound,
    httpOk,
    httpUnprocessableEntity,
} from '../services/httpResponsesService';
import {hashPassword} from '../services/hashService';
import {removePassword} from '../services/passwordService';
import '../models/IRequest';
import {checkSchemaValidity} from '../services/modelsService';

class UserController {
    static createAdmin = async () => {
        const admin = await User.findOne({role: 'admin'});

        if (!admin) {
            const admin = new User({
                role: 'admin',
                email: 'admin@gmail.com',
                password: hashPassword('admin'),
                inscriptionDate: new Date(),
            });

            admin.save()
                .then(() => console.log('Admin created.'))
                .catch(err => console.error('Could not create admin... Error: ', err));
            return;
        }

        console.log('Admin already exists.');
    }

    static createArtist = async (req: Request, res: Response) => {
        checkSchemaValidity(CreateUserSchema, req.body, res);

        const newArtist = new User({
            role: 'artist',
            email: req.body.email,
            password: hashPassword(req.body.password),
            pseudo: req.body.pseudo,
            banned: false,
        });
        const users = await User.find();

        if (users.filter((user) => user.email === newArtist.email).length > 0) {
            httpUnprocessableEntity(res, 'Email already taken.')
            return;
        }

        if (newArtist.pseudo && users.filter((user) => user.pseudo === newArtist.pseudo).length > 0) {
            httpUnprocessableEntity(res, 'Pseudo already taken.')
            return;
        }

        await newArtist.save();
        httpCreated(res, removePassword(newArtist.toObject()));
    }

    static createManager = async (req: Request, res: Response) => {
        checkSchemaValidity(CreateUserSchema, req.body, res);

        const newManager = new User({
            role: 'manager',
            email: req.body.email,
            password: hashPassword(req.body.password),
        });
        const users = await User.find();

        if (users.filter((user) => user.email === newManager.email).length > 0) {
            httpUnprocessableEntity(res, 'Email already taken.')
            return;
        }

        await newManager.save();
        httpCreated(res, removePassword(newManager.toObject()));
    }

    static async getCurrentUser(req: Request, res: Response) {
        const user = await User.findById(req.auth?.id);

        if (!user) {
            httpNotFound(res);
            return;
        }

        httpOk(res, removePassword(user.toObject()));
    }

    static getAllUsers = async (req: Request, res: Response) => {
        const users = await User.find();
        httpOk(res, users.map((user) => removePassword(user.toObject())));
    }

    static getOneUser = async (req: Request, res: Response) => {
        const user = await User.findById(req.params.id);

        if (!user) {
            httpNotFound(res);
            return;
        }

        httpOk(res, removePassword(user.toObject()));
    }

    static updateUser = async (req: Request, res: Response) => {
        checkSchemaValidity(UpdateUserSchema, req.body, res);

        const userId: string = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            httpNotFound(res);
            return;
        }

        const updatedUser = new User({
            ...user,
            ...req.body,
        });

        await User.findByIdAndUpdate(userId, updatedUser);
        httpOk(res, removePassword(updatedUser.toObject()));
    }

    static updateAdmin = async (req: Request, res: Response) => {
        checkSchemaValidity(UpdateAdminSchema, req.body, res);

        const userId: string = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            httpNotFound(res);
            return;
        }

        const updatedUser = new User({
            ...user,
            password: hashPassword(req.body.password),
        });

        await User.findByIdAndUpdate(userId, updatedUser);
        httpOk(res, removePassword(updatedUser));
    }

    static banUser = async (req: Request, res: Response) => {
        const user = await User.findByIdAndUpdate(req.params.id, {banned: true}, {new: true});

        if (!user) {
            httpNotFound(res);
            return;
        }

        httpOk(res, removePassword(user.toObject()));
    }

    static deleteUser = async (req: Request, res: Response) => {
        const user = await User.findByIdAndRemove(req.params.id)

        if (!user) {
            httpNotFound(res);
            return;
        }

        httpNoContent(res);
    }
}

export default UserController;
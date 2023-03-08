import {
    CreateArtistSchema,
    CreateManagerSchema,
    UpdateAdminSchema,
    UpdateArtistSchema,
    UpdateManagerSchema,
    User,
} from '../models/IUser';
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
import {ADMIN_EMAIL, ADMIN_PASSWORD} from '../config';

class UserController {
    static createAdmin = async () => {
        const admin = await User.findOne({role: 'admin'});

        if (!admin) {
            if (!ADMIN_EMAIL) {
                throw new Error('ADMIN_EMAIL is not deﬁned');
            }

            if (!ADMIN_PASSWORD) {
                throw new Error('ADMIN_PASSWORD is not deﬁned');
            }

            const admin = new User({
                role: 'admin',
                email: ADMIN_EMAIL,
                password: hashPassword(ADMIN_PASSWORD),
            });

            admin.save()
                .then(() => console.log('Admin created.'))
                .catch(err => console.error('Could not create admin... Error: ', err));
            return;
        }

        console.log('Admin already exists.');
    }

    static createArtist = async (req: Request, res: Response) => {
        const {error} = CreateArtistSchema.validate(req.body);
        if (error) {
            httpUnprocessableEntity(res, error.message);
            return;
        }

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
        const {error} = CreateManagerSchema.validate(req.body);
        if (error) {
            httpUnprocessableEntity(res, error.message);
            return;
        }

        const newManager = new User({
            role: 'manager',
            email: req.body.email,
            password: hashPassword(req.body.password),
        });
        const users = await User.find({email: newManager.email});

        if (users.filter((user) => user.email === newManager.email).length > 0) {
            httpUnprocessableEntity(res, 'Email already taken.')
            return;
        }

        await newManager.save();
        httpCreated(res, removePassword(newManager.toObject()));
    }

    static getAllUsers = async (req: Request, res: Response) => {
        const users = await User.find();
        httpOk(res, users.map((user) => removePassword(user.toObject())));
    }

    static getCurrentUser = async (req: Request, res: Response) =>{
        const user = await User.findById(req.auth?.id);

        if (!user) {
            httpNotFound(res);
            return;
        }

        httpOk(res, removePassword(user.toObject()));
    }

    static getOneUser = async (req: Request, res: Response) => {
        const user = await User.findById(req.params.id);

        if (!user) {
            httpNotFound(res);
            return;
        }

        httpOk(res, removePassword(user.toObject()));
    }

    static updateArtist = async (req: Request, res: Response) => {
        const {error} = UpdateArtistSchema.validate(req.body);
        if (error) {
            httpUnprocessableEntity(res, error.message);
            return;
        }

        const changes = req.body.password ?
            {
                ...req.body,
                password: hashPassword(req.body.password),
            } :
            {...req.body}
        const user = await User.findByIdAndUpdate(req.params.id, changes, {new: true});

        if (!user) {
            httpNotFound(res);
            return;
        }

        httpOk(res, removePassword(user.toObject()));
    }

    static updateManager = async (req: Request, res: Response) => {
        const {error} = UpdateManagerSchema.validate(req.body);
        if (error) {
            httpUnprocessableEntity(res, error.message);
            return;
        }

        const changes = req.body.password ?
            {
                ...req.body,
                password: hashPassword(req.body.password),
            } :
            {...req.body}
        const user = await User.findByIdAndUpdate(req.params.id, changes, {new: true});

        if (!user) {
            httpNotFound(res);
            return;
        }

        httpOk(res, removePassword(user.toObject()));
    }

    static updateAdmin = async (req: Request, res: Response) => {
        const {error} = UpdateAdminSchema.validate(req.body);
        if (error) {
            httpUnprocessableEntity(res, error.message);
            return;
        }

        const user = await User.findByIdAndUpdate(req.auth?.id, {password: hashPassword(req.body.password)}, {new: true});

        if (!user) {
            httpNotFound(res);
            return;
        }

        httpOk(res, removePassword(user.toObject()));
    }

    static banArtist = async (req: Request, res: Response) => {
        const user = await User.findByIdAndUpdate(req.params.id, {banned: true}, {new: true});

        if (!user) {
            httpNotFound(res);
            return;
        }

        if (user.role !== 'artist') {
            httpUnprocessableEntity(res, 'Only artists can be banned.');
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
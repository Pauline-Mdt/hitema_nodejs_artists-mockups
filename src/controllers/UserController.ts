import {CreateUserSchema, IUser, UpdateAdminSchema, UpdateUserSchema} from '../models/IUser';
import {Request, Response} from 'express';
import * as crypto from 'crypto';
import {
    httpCreated, httpNoContent,
    httpNotFound,
    httpOk,
    httpUnprocessableEntity,
} from '../services/httpResponsesService';
import {hashPassword} from '../services/hashService';
import {removePassword} from '../services/passwordService';
import '../models/IRequest';

class UserController {
    static users: IUser[] = [
        {
            id: crypto.randomUUID(),
            role: 'admin',
            email: 'admin@gmail.com',
            password: hashPassword('admin'),
            inscriptionDate: new Date(),
        }
    ];

    static createArtist = (req: Request, res: Response) => {
        const newArtist: IUser = {
            id: crypto.randomUUID(),
            role: 'artist',
            email: req.body.email,
            password: req.body.password,
            pseudo: req.body.pseudo,
            banned: false,
            inscriptionDate: new Date(),
        };
        const {error} = CreateUserSchema.validate(newArtist);

        if (error) {
            httpUnprocessableEntity(res, error.message);
            return;
        }

        if (this.users.filter((user) => user.email === newArtist.email).length > 0) {
            httpUnprocessableEntity(res, 'Email already taken.')
            return;
        }

        if (this.users.filter((user) => user.pseudo === newArtist.pseudo).length > 0) {
            httpUnprocessableEntity(res, 'Pseudo already taken.')
            return;
        }

        this.users.push(newArtist);

        httpCreated(res, removePassword(newArtist));
    }

    static createManager = (req: Request, res: Response) => {
        const newManager: IUser = {
            id: crypto.randomUUID(),
            role: 'manager',
            email: req.body.email,
            password: req.body.password,
            inscriptionDate: new Date(),
        };
        const {error} = CreateUserSchema.validate(newManager);

        if (error) {
            httpUnprocessableEntity(res, error.message);
            return;
        }

        if (this.users.filter((user) => user.email === newManager.email).length > 0) {
            httpUnprocessableEntity(res, 'Email already taken.')
            return;
        }

        this.users.push(newManager);

        httpCreated(res, removePassword(newManager));
    }

    static getAllUsers = (req: Request, res: Response) => {
        httpOk(res, this.users.map((user) => removePassword(user)));
    }

    static getOneUser = (req: Request, res: Response) => {
        const userId: string = req.params.id;
        const user = this.users.find((user) => user.id === userId);

        if (!user) {
            httpNotFound(res);
            return;
        }

        httpOk(res, removePassword(user));
    }

    static getCurrentUser(req: Request, res: Response) {
        const user = UserController.users.filter((user) => user.id === req.auth?.id)[0];
        if (!user) {
            httpNotFound(res);
            return;
        }

        httpOk(res, removePassword(user));
    }

    static updateUser = (req: Request, res: Response) => {
        const userId: string = req.params.id;
        const user = this.users.find((user) => user.id === userId);

        if (!user) {
            httpNotFound(res);
            return;
        }

        const {error} = UpdateUserSchema.validate(req.body);

        if (error) {
            httpUnprocessableEntity(res, error.message);
            return;
        }

        const updatedUser: IUser = {
            ...user,
            ...req.body,
        }

        this.users.splice(this.users.indexOf(user), 1, updatedUser);

        httpOk(res, removePassword(updatedUser));
    }

    static updateAdmin = (req: Request, res: Response) => {
        const userId: string = req.params.id;
        const user = this.users.find((user) => user.id === userId);

        if (!user) {
            httpNotFound(res);
            return;
        }

        const {error} = UpdateAdminSchema.validate(req.body);

        if (error) {
            httpUnprocessableEntity(res, error.message);
            return;
        }

        const updatedUser: IUser = {
            ...user,
            password: hashPassword(req.body.password),
        }

        this.users.splice(this.users.indexOf(user), 1, updatedUser);

        httpOk(res, removePassword(updatedUser));
    }

    static banUser = (req: Request, res: Response) => {
        const userId: string = req.params.id;
        const user = this.users.find((user) => user.id === userId);

        if (!user) {
            httpNotFound(res);
            return;
        }

        user.banned = true;

        httpOk(res, removePassword(user));
    }

    static deleteUser = (req: Request, res: Response) => {
        const userId: string = req.params.id;
        const user = this.users.find((user) => user.id === userId);

        if (!user) {
            httpNotFound(res);
            return;
        }

        this.users.splice(this.users.indexOf(user), 1);

        httpNoContent(res);
    }
}

export default UserController;
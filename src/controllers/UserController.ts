import {CreateUserSchema, IUser, UpdateAdminSchema, UpdateUserSchema} from '../models/IUser';
import {Request, Response} from 'express';
import * as crypto from 'crypto';
import {httpCreated, httpNotFound, httpOk, httpUnprocessableEntity} from '../services/httpResponsesService';

class UserController {
    static users: IUser[] = [
        {
            id: crypto.randomUUID(),
            role: 'admin',
            email: 'admin@gmail.com',
            password: 'admin',
            inscriptionDate: new Date(),
        }
    ];

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

        this.users.push(newManager);

        httpCreated(res, newManager);
    }

    static createArtist = (req: Request, res: Response) => {
        const newArtist: IUser = {
            id: crypto.randomUUID(),
            role: 'artist',
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            banned: false,
            inscriptionDate: new Date(),
        };
        const {error} = CreateUserSchema.validate(newArtist);

        if (error) {
            httpUnprocessableEntity(res, error.message);
            return;
        }

        this.users.push(newArtist);

        httpCreated(res, newArtist);
    }

    static getAllUsers = (req: Request, res: Response) => {
        httpOk(res, this.users);
    }

    static getOneUser = (req: Request, res: Response) => {
        const userId: string = req.params.id;
        const user = this.users.find((user) => user.id === userId);

        if (!user) {
            httpNotFound(res);
            return;
        }

        httpOk(res, user);
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

        this.users = this.users.splice(this.users.indexOf(user), 1, updatedUser);

        httpOk(res, updatedUser);
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
            ...req.body,
        }

        this.users = this.users.splice(this.users.indexOf(user), 1, updatedUser);

        httpOk(res, updatedUser);
    }

    static banUser = (req: Request, res: Response) => {
        const userId: string = req.params.id;
        const user = this.users.find((user) => user.id === userId);

        if (!user) {
            httpNotFound(res);
            return;
        }

        user.banned = true;

        httpOk(res, user);
    }

    static deleteUser = (req: Request, res: Response) => {
        const userId: string = req.params.id;
        const user = this.users.find((user) => user.id === userId);

        if (!user) {
            httpNotFound(res);
            return;
        }

        this.users.splice(this.users.indexOf(user), 1);

        httpOk(res, user);
    }
}

export default UserController;
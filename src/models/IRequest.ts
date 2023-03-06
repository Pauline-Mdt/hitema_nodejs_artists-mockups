import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
    interface Request {
        auth: jwt.JwtPayload;
    }
}

export {};
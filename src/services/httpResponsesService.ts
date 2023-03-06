import {Response} from 'express';

// 200 - 299
/**
 *
 * @param res
 * @param data Data to send in the response
 */
export const httpOk = (res: Response, data: object|[]) => {
    res.status(200)
        .json({
            status: 'OK',
            data,
        });
}

/**
 *
 * @param res
 * @param data Data to send in the response
 */
export const httpCreated = (res: Response, data: object|[]) => {
    res.status(201)
        .json({
            status: 'Created',
            message: 'Entity created.',
            data,
        });
}

export const httpNoContent = (res: Response) => {
    res.status(204)
        .json({
            status: 'No Content',
            message: 'Entity deleted.',
        });
}

// 400 - 499
/**
 *
 * @param res
 * @param message Message to send in the response about the error
 */
export const httpBadRequest = (res: Response, message: string) => {
    res.status(400)
        .json({
            status: 'Bad Request',
            message,
        });
}

/**
 *
 * @param res
 * @param message Message to send in the response about the error
 */
export const httpUnauthorized = (res: Response, message: string) => {
    res.status(401)
        .json({
            status: 'Unauthorized',
            message,
        });
}

export const httpForbidden = (res: Response) => {
    res.status(403)
        .json({
            status: 'Forbidden',
            message: 'You are not allowed to do this action.',
        });
}

export const httpNotFound = (res: Response) => {
    res.status(404)
        .json({
            status: 'Not Found',
            message: 'Resource not found.',
        });
}

/**
 *
 * @param res
 * @param message Message to send in the response about the error
 */
export const httpUnprocessableEntity = (res: Response, message: string) => {
    res.status(422)
        .json({
            status: 'Unprocessable Entity',
            message,
        });
}

// 500 - 599
export const httpInternalServerError = (res: Response, message: string) => {
    res.status(500)
        .json({
            status: 'Internal Server Error',
            message,
        });
}
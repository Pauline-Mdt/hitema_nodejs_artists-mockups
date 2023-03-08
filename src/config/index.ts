import dotenv from 'dotenv';

dotenv.config();

export const APP_PORT = 3000;

export const JWT_SECRET = process.env.JWT_SECRET as string;

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD as string;
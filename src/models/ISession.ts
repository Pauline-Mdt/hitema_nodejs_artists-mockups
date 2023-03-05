declare module 'express-session' {
    interface SessionData {
        token: string;
        user: {
            id: string;
            role: string;
        }
    }
}

export {};
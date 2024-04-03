import { Authentication } from 'src/auth/authentication.entity';
export declare class User {
    constructor(username: string, email: string, authentication: Authentication);
    readonly id: string;
    username: string;
    email: string;
    authentication: Authentication;
}

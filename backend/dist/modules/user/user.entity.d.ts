import { Authentication } from 'src/auth/authentication.entity';
import { UserOnGroups } from '../group/user-on-group.entity';
export declare class User {
    constructor(username: string, email: string, authentication: Authentication);
    readonly id: string;
    username: string;
    email: string;
    authentication: Authentication;
    userOnGroups: Array<UserOnGroups>;
}

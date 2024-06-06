import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUserId(userId: string, username: string): {
        userId: string;
        username: string;
    };
}

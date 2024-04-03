import { UserService } from './modules/user/user.service';
export declare class AppController {
    userService: UserService;
    constructor(userService: UserService);
    test(): string;
    testUser(username: any): void;
}

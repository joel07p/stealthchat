<<<<<<< HEAD
import { UserService } from './modules/user/user.service';
export declare class AppController {
    userService: UserService;
    constructor(userService: UserService);
    test(): string;
    testUser(username: any): void;
=======
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
>>>>>>> 822aca9d10b7325e68f388c3c26962881af91ccf
}

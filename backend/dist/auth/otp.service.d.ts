<<<<<<< HEAD
import { UserContext } from "src/modules/user/user-context";
import { MailService } from "src/service/mail.service";
export declare class OTPService {
    private userContext;
    private mailService;
    private readonly lenght;
    constructor(userContext: UserContext, mailService: MailService);
=======
import { UserContext } from "src/user/user-context";
export declare class OTPService {
    private userContext;
    private readonly lenght;
    constructor(userContext: UserContext);
>>>>>>> 822aca9d10b7325e68f388c3c26962881af91ccf
    generateOTP(): Array<number>;
    sendOTP(): void;
    checkOTP(accessCode: Array<number>): boolean;
}

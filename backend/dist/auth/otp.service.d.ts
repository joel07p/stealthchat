import { UserContext } from "src/modules/user/user-context";
import { MailService } from "src/service/mail.service";
export declare class OTPService {
    private userContext;
    private mailService;
    private readonly lenght;
    constructor(userContext: UserContext, mailService: MailService);
    generateOTP(): Array<number>;
    sendOTP(): void;
    checkOTP(accessCode: Array<number>): boolean;
}

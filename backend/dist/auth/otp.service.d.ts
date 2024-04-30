import { UserContext } from "src/modules/user/user-context";
import { MailService } from "src/service/mail.service";
import { AuthService } from "./auth.service";
import { OTPAuth } from "./model";
import { Tokens } from "./types";
export declare class OTPService {
    private readonly userContext;
    private readonly authService;
    private readonly mailService;
    private readonly length;
    constructor(userContext: UserContext, authService: AuthService, mailService: MailService);
    private generateOTP;
    sendOTP(email: string): Promise<boolean>;
    verifyOTP({ username, password, otp }: OTPAuth): Promise<Tokens>;
}

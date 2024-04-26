import { UserContext } from "src/modules/user/user-context";
import { AuthService } from "./auth.service";
import { OTPAuth } from "./model";
import { MailService } from "src/service/mail.service";
export declare class OTPService {
    private userContext;
    private authService;
    private mailService;
    private readonly length;
    constructor(userContext: UserContext, authService: AuthService, mailService: MailService);
    generateOTP(): string;
    sendOTP(): void;
    verifyOTP(credentials: OTPAuth): Promise<import("src/auth/types").Tokens>;
}

import { UserContext } from "src/modules/user/user-context";
import { MailService } from "src/service/mail.service";
import { OTPAuth } from "./model";
import { AuthService } from "./auth.service";
export declare class OTPService {
    private userContext;
    private mailService;
    private authService;
    private readonly length;
    constructor(userContext: UserContext, mailService: MailService, authService: AuthService);
    generateOTP(): string;
    sendOTP(): void;
    verifyOTP(credentials: OTPAuth): Promise<import("src/auth/types").Tokens>;
}

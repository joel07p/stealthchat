import { UserContext } from "src/modules/user/user-context";
import { AuthService } from "./auth.service";
import { OTPAuth } from "./model";
import { MailService } from "src/service/mail.service";
import { UserService } from "src/modules/user/user.service";
export declare class OTPService {
    private readonly userContext;
    private readonly authService;
    private readonly mailService;
    private readonly userService;
    private readonly length;
    constructor(userContext: UserContext, authService: AuthService, mailService: MailService, userService: UserService);
    generateOTP(): string;
    sendOTP(userId: string): Promise<void>;
    verifyOTP(credentials: OTPAuth): Promise<import("src/auth/types").Tokens>;
}

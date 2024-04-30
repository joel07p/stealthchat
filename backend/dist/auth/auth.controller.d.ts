import { AuthService } from './auth.service';
import { BaseAuth, Email, OTPAuth, SignUpDTO } from './model';
import { OTPService } from './otp.service';
export declare class AuthController {
    private authService;
    private otpService;
    constructor(authService: AuthService, otpService: OTPService);
    signIn(credentials: BaseAuth): Promise<import("src/auth/types").Tokens>;
    signUp(credentials: SignUpDTO): Promise<boolean | import("src/modules/user/user.entity").User>;
    logout(userId: string): Promise<void>;
    refreshTokens(userId: string, data: any): Promise<import("src/auth/types").Tokens>;
    getAccessCode({ email }: Email): Promise<boolean>;
    verifyAccessCode(credentials: OTPAuth): Promise<import("src/auth/types").Tokens>;
}

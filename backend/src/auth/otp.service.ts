import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { UserContext } from "src/modules/user/user-context";
import { MailService } from "src/service/mail.service";
import { AuthService } from "./auth.service";
import { OTPAuth } from "./model";

@Injectable()
export class OTPService {
    private readonly length: number = 6

    constructor(
        private userContext: UserContext,
        private mailService: MailService,
        private authService: AuthService
    ) {}

    generateOTP(): string {
        let accessCode = '';
    
        for (let index = 0; index < this.length; index++) {
            accessCode += Math.floor(Math.random() * 10).toString();
        }
    
        this.userContext.setAccessCode(accessCode);
    
        return accessCode;
    }
    

    sendOTP(): void {
        const accessCode = this.generateOTP()
        Logger.log(accessCode)
    }

    verifyOTP(credentials: OTPAuth) {
        const { username, password, otp } = credentials

        const isAuthenticated = this.userContext.getAccessCode() === otp;
        if(!isAuthenticated) throw new BadRequestException("OTP is invalid")
        this.userContext.setAccessCode(null)
        this.userContext.setIsAuthenticated(isAuthenticated);

        return this.authService.signIn({ username, password })
    }
}
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { UserContext } from "src/modules/user/user-context";
import { AuthService } from "./auth.service";
import { OTPAuth } from "./model";
import { MailService } from "src/service/mail.service";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class OTPService {
    private readonly length: number = 6

    constructor(
        private readonly userContext: UserContext,
        private readonly authService: AuthService,
        private readonly mailService: MailService,
        private readonly userService: UserService
    ) {}

    generateOTP(): string {
        let accessCode = '';
    
        for (let index = 0; index < this.length; index++) {
            accessCode += Math.floor(Math.random() * 10).toString();
        }
    
        this.userContext.setAccessCode(accessCode);
    
        return accessCode;
    }
    

    async sendOTP(userId: string) {
        const accessCode = this.generateOTP()
        const user = await this.userService.getUserProperty(userId, undefined)
        this.userContext.setUser(user)
        Logger.log(this.userContext.getEmail());
        this.mailService.sendOTP(accessCode) // does not work yet! UserContext has to be loaded
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
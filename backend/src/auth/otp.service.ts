import { ForbiddenException, Injectable } from "@nestjs/common";
import { UserContext } from "src/modules/user/user-context";
import { MailService } from "src/service/mail.service";
import { AuthService } from "./auth.service";
import { OTPAuth } from "./model";
import { Tokens } from "./types";

@Injectable()
export class OTPService {
    private readonly length: number = 6

    constructor(
        private readonly userContext: UserContext,
        private readonly authService: AuthService,
        private readonly mailService: MailService,
    ) {}

    private generateOTP(): string {
        let accessCode = '';
    
        for (let index = 0; index < this.length; index++) {
            accessCode += Math.floor(Math.random() * 10).toString();
        }
    
        this.userContext.setAccessCode(accessCode);
    
        return accessCode;
    }
    

    async sendOTP(email: string) {
        const accessCode = this.generateOTP()

        this.userContext.setAccessCode(accessCode)
        return await this.mailService.sendOTP(email, accessCode)
    }


    async verifyOTP({username, password, otp}: OTPAuth): Promise<Tokens> {
        if(otp === this.userContext.getAccessCode()) {
            return await this.authService.signIn({ username, password })
        } else {
            throw new ForbiddenException("Invalid OTP or credentials")
        }
    }
}
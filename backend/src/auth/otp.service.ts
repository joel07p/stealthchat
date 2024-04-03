import { Injectable } from "@nestjs/common";
import { UserContext } from "src/modules/user/user-context";
import { MailService } from "src/service/mail.service";

@Injectable()
export class OTPService {
    private readonly lenght: number = 6

    constructor(
        private userContext: UserContext,
        private mailService: MailService
    ) {}

    generateOTP(): Array<number> {
        const accessCode = []

        for(let index = 0; index < this.lenght; index++) {
            accessCode.push(Math.floor(Math.random() * 10))
        }

        this.userContext.setAccessCode(accessCode)

        return accessCode
    }

    sendOTP(): void {
        const accessCode = this.generateOTP()
    }

    checkOTP(accessCode: Array<number>): boolean {
        const isAuthenticated = this.userContext.getAccessCode() === accessCode;
        this.userContext.setIsAuthenticated(isAuthenticated);
        return isAuthenticated;
    }
}
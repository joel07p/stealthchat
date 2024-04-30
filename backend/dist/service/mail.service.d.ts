import { MailerService } from '@nestjs-modules/mailer';
import { UserContext } from 'src/modules/user/user-context';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendOTP(userContext: UserContext, otp: string): Promise<void>;
}

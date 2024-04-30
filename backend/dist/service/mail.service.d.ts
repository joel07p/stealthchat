import { MailerService } from '@nestjs-modules/mailer';
import { UserContext } from 'src/modules/user/user-context';
export declare class MailService {
    private readonly mailerService;
    private readonly userContext;
    constructor(mailerService: MailerService, userContext: UserContext);
    sendOTP(otp: string): Promise<void>;
}

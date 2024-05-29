import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/modules/user/user.entity';
import { Repository } from 'typeorm';
export declare class MailService {
    private readonly userRepository;
    private readonly mailerService;
    constructor(userRepository: Repository<User>, mailerService: MailerService);
    sendOTP(email: string, otp: string): Promise<boolean>;
}

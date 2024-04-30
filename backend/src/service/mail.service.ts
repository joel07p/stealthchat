import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserContext } from 'src/modules/user/user-context';

@Injectable()
export class MailService {
    
  constructor(
    private readonly mailerService: MailerService,
    private readonly userContext: UserContext
  ) {}

  async sendOTP(otp: string) {
    this
      .mailerService
      .sendMail({
        to: this.userContext.getEmail(), // userContext is undefined
        from: 'StealthChat<stealthchat@joelp.xyz>',
        subject: 'Your One-Time Verification-Code',
        template: 'otpMail', 
        context: {
          code: otp,
          username: this.userContext.getUsername(),
        },
      })
       .then((success) => {
        console.log(success)
      })
      .catch((err) => {
        console.log(err)
      });
    }
}

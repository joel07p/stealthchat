import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserContext } from 'src/modules/user/user-context';

@Injectable()
export class MailService {
    
  constructor(private readonly mailerService: MailerService) {}

  async sendOTP(userContext: UserContext, otp: string) {
    this
      .mailerService
      .sendMail({
        to: userContext.getEmail(), // userContext is undefined
        from: 'StealthChat<stealthchat@joelp.xyz>',
        subject: 'Your One-Time Verification-Code',
        template: 'otpMail', 
        context: {
          code: otp,
          username: userContext.getUsername(), // userContext is undefined
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

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MailService {
    
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly mailerService: MailerService,
  ) {}

  async sendOTP(email: string, otp: string) {
    try {
      const user = await this.userRepository.findOne({where: {email}})

      if(!user) {
        throw new NotFoundException("No user found for corresponding email")
      }
  
      this
        .mailerService
        .sendMail({
          to: email,
          from: 'StealthChat<stealthchat@joelp.xyz>',
          subject: 'Your One-Time Verification-Code',
          template: 'otpMail', 
          context: {
            code: otp,
            username: user.username
          },
        })
         .then((success) => {
          console.log(success)
        })
        .catch((err) => {
          console.log(err)
        });
      } catch(e) {
        if(e instanceof NotFoundException) {
          Logger.error("Send Email | User not found")
          return false
        }
      }

      return true
    } 
}

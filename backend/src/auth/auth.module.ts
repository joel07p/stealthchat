import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/user.entity';
import { Authentication } from './authentication.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserContext } from 'src/modules/user/user-context';
import { ConfigService } from '@nestjs/config';
import { AtStrategy, RtStrategy } from './strategies';
import { OTPService } from './otp.service';
import { UserOnGroups } from 'src/modules/group/user-on-group.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from 'src/service/mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Authentication, UserOnGroups]),
    JwtModule.register({}),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          tls:{
            rejectUnauthorized: false,  
            ciphers: "SSLv3"  
          }
        },
        defaults: {
          from:'"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: process.cwd() + '/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [AuthService, UserContext, ConfigService, AtStrategy, RtStrategy, OTPService, MailService],
  controllers: [AuthController],
})
export class AuthModule {}

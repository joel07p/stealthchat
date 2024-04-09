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
import { MailService } from 'src/service/mail.service';
import { UserOnGroups } from 'src/modules/group/user-on-group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Authentication, UserOnGroups]),
    JwtModule.register({})
  ],
  providers: [AuthService, UserContext, ConfigService, AtStrategy, RtStrategy, OTPService, MailService],
  controllers: [AuthController],
})
export class AuthModule {}

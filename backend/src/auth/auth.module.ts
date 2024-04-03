import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/user.entity';
import { Authentication } from './authentication.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserContext } from 'src/modules/user/user-context';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Authentication]),
    JwtModule.register({})
  ],
  providers: [AuthService, UserContext, ConfigService],
  controllers: [AuthController],
})
export class AuthModule {}

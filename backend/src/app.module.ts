import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupModule } from './modules/group/group.module';
import { InvitationModule } from './modules/invitation/invitation.module';
import { MessageModule } from './modules/message/message.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RoomModule } from './modules/room/room.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { UserService } from './modules/user/user.service';
import { Authentication } from './auth/authentication.entity';
import { UserContext } from './modules/user/user-context';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { Group } from './modules/group/group.entity';
import { UserOnGroups } from './modules/group/user-on-group.entity';
import { Room } from './modules/room/room.entity';
import { Message } from './modules/message/message.entity';
import { Permission } from './modules/permission/permission.entity';
import { Invitation } from './modules/invitation/invitation.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    AuthModule,
    GroupModule,
    InvitationModule,
    RoomModule,
    MessageModule,
    PermissionModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '193.135.10.73',
      port: 3306,
      username: 'deployment',
      password: '37F(MmN.(YAI',
      database: 'dev2',
      entities: [User, Authentication, Group, UserOnGroups, Room, Message, Permission, Invitation],
      synchronize: true
    }),
    TypeOrmModule.forFeature([User, Authentication]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    UserContext,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AtGuard
    }
  ],
})
export class AppModule {}

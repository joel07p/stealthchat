import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Authentication } from './auth/authentication.entity';
import { NotFoundExceptionFilter } from './common/error';
import { AtGuard } from './common/guards';
import { Group } from './modules/group/group.entity';
import { GroupModule } from './modules/group/group.module';
import { UserOnGroups } from './modules/group/user-on-group.entity';
import { Invitation } from './modules/invitation/invitation.entity';
import { InvitationModule } from './modules/invitation/invitation.module';
import { Message } from './modules/message/message.entity';
import { MessageModule } from './modules/message/message.module';
import { Permission } from './modules/permission/permission.entity';
import { PermissionModule } from './modules/permission/permission.module';
import { Room } from './modules/room/room.entity';
import { RoomModule } from './modules/room/room.module';
import { UserContext } from './modules/user/user-context';
import { User } from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';
import { UserService } from './modules/user/user.service';
import { WebSocketModule } from './websocket/websocket.module';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
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
      host: process.env.HOST_DB,
      port: parseInt(process.env.PORT_DB),
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB, 
      database: 'dev2',
      entities: [User, Authentication, Group, UserOnGroups, Room, Message, Permission, Invitation],
      synchronize: true
    }),
    TypeOrmModule.forFeature([User, Authentication]),
    FileModule,
    WebSocketModule
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
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
  ],
})
export class AppModule {}

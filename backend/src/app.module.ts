import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
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
      database: 'dev1',
      entities: [User, Authentication],
      synchronize: true
    }),
    TypeOrmModule.forFeature([User, Authentication])
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}

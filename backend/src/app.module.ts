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
    PermissionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

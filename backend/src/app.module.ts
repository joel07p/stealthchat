import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';
import { InvitationModule } from './invitation/invitation.module';
import { RoomModule } from './room/room.module';
import { MessageService } from './message/message.service';
import { MessageController } from './message/message.controller';
import { MessageModule } from './message/message.module';

@Module({
  imports: [UserModule, AuthModule, GroupModule, InvitationModule, RoomModule, MessageModule],
  controllers: [AppController, MessageController],
  providers: [AppService, UserService, MessageService],
})
export class AppModule {}

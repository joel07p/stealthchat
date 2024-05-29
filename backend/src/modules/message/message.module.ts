import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../room/room.entity';
import { Message } from './message.entity';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { Authentication } from 'src/auth/authentication.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Message, Room, User, Authentication])
    ],
    providers: [MessageService, UserService],
    controllers: [MessageController]
})
export class MessageModule {}

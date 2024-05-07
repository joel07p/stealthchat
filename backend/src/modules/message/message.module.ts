import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../room/room.entity';
import { Message } from './message.entity';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Message, Room])
    ],
    providers: [MessageService],
    controllers: [MessageController]
})
export class MessageModule {}

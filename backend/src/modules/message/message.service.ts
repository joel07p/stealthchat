import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../room/room.entity';
import { Message } from './message.entity';
import { AddMessage } from './types';

@Injectable()
export class MessageService {
    private logger = new Logger(MessageService.name)

    constructor(
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
        @InjectRepository(Room) private readonly roomRepository: Repository<Room>,

    ) {}

    async addMessage({message, username, roomId}: AddMessage) {
        this.logger.log(`Trying to create message in room ${roomId}`)

        const messageInstance = new Message(message, username, null)
        const savedMessage = await this.messageRepository.save(messageInstance)
        await this.addMessageToRoom(roomId, savedMessage)

        this.logger.log("Message created")
        
        return savedMessage
    }

    private async addMessageToRoom(roomId: string, message: Message) {
        this.logger.log(`Trying to save message in room ${roomId}`)
        
        const room = await this.roomRepository.findOne({where: {id: roomId}})

        if(room) {
            message.room = room
            await this.messageRepository.save(message)
        } else {
            throw new NotFoundException()
        }
    }
}

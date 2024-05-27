import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../room/room.entity';
import { Message } from './message.entity';
import { AddMessage, DeleteMessage } from './types';
import { log } from 'console';

@Injectable()
export class MessageService {
    private logger = new Logger(MessageService.name)

    constructor(
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
        @InjectRepository(Room) private readonly roomRepository: Repository<Room>,

    ) {}

    async getMessage(roomId: string, relations: Array<string>) {
        return await this.messageRepository.findOne({where: {room: {id: roomId}}, relations})
    }

    async getMessages(userId: string, roomId: string): Promise<Message[]> {
        this.logger.log(`Trying to get messages for room ${roomId}`);
        return await this.messageRepository.find({
            where: { room: { id: roomId } },
            relations: ['room'],
            order: { sentAt: 'DESC' },
        });
    }

    async addMessage({message, username, roomId}: AddMessage) {
        this.logger.log(`Trying to create message in room ${roomId}`)

        const messageInstance = new Message(message, username, null)
        const savedMessage = await this.messageRepository.save(messageInstance)
        await this.addMessageToRoom(roomId, savedMessage)

        this.logger.log("Message created")
        
        return savedMessage
    }

    async deleteMessage({messageId, roomId}: DeleteMessage) {
        this.logger.log(`Trying to delete message with id ${roomId} in room ${roomId}`)

        const message = await this.getMessage(messageId, ['room'])

        if(message && (message.room.id === roomId)) {
            return await this.messageRepository.delete(message)
        } else {
            throw new NotFoundException(`Message ${messageId} not found`)
        }
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

import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { Repository } from 'typeorm';
import { Room } from '../room/room.entity';
import { UserService } from '../user/user.service';
import { Message } from './message.entity';
import { AddMessage, DeleteMessage, UpdateMessageText } from './types';

@Injectable()
export class MessageService {
    private logger = new Logger(MessageService.name)

    constructor(
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
        @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
        private readonly userService: UserService
    ) {}
    sui() {
        log("sui")
    }

    async getMessageById(messageId: string) {
        log("message + " + messageId)
        return await this.messageRepository.findOne({where: {id: messageId}})
        return {username: "sui"}
        //log(await this.messageRepository.findOne({where: {id: messageId}}))
        //return await this.messageRepository.findOne({where: {id: messageId}})
    }

    async getMessage(messageId: string, relations: Array<string>) {
        return await this.messageRepository.findOne({where: {id: messageId}, relations})
    }

    async getMessages(userId: string, roomId: string): Promise<Message[]> {
        this.logger.log(`Trying to get messages for room ${roomId}`);
        return await this.messageRepository.find({
            where: { room: { id: roomId } },
            relations: ['room'],
            order: { sentAt: 'DESC' },
        });
    }

    async addMessage({message, roomId}: AddMessage, userId: string) {
        this.logger.log(`Trying to create message in room ${roomId}`)

        const username = await this.userService.getUserProperty(userId, "username")
        const messageInstance = new Message(message, username, null)
        const savedMessage = await this.messageRepository.save(messageInstance)
        await this.addMessageToRoom(roomId, savedMessage)

        this.logger.log("Message created")
        
        return savedMessage
    }

    async updateMessageText({messageId, roomId, messageText}: UpdateMessageText) {
        const message = await this.getMessage(messageId, ["room"])
        if(!(message.room.id === roomId)) throw new ForbiddenException()

        const updatedMessage = await this.messageRepository.save({...message, message: messageText})
        this.logger.log("Message updated")

        return updatedMessage
    }

    async deleteMessage({messageId, roomId}: DeleteMessage) {
        this.logger.log(`Trying to delete message with id ${messageId} in room ${roomId}`)

        const message = await this.getMessage(messageId, ['room'])

        if(message && (message.room.id === roomId)) {
            await this.messageRepository.delete(message)
            return message
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

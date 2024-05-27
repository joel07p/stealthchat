import { Repository } from 'typeorm';
import { Room } from '../room/room.entity';
import { Message } from './message.entity';
import { AddMessage, DeleteMessage } from './types';
export declare class MessageService {
    private readonly messageRepository;
    private readonly roomRepository;
    private logger;
    constructor(messageRepository: Repository<Message>, roomRepository: Repository<Room>);
    getMessage(roomId: string, relations: Array<string>): Promise<Message>;
    getMessages(userId: string, roomId: string): Promise<Message[]>;
    addMessage({ message, username, roomId }: AddMessage): Promise<Message>;
    deleteMessage({ messageId, roomId }: DeleteMessage): Promise<import("typeorm").DeleteResult>;
    private addMessageToRoom;
}

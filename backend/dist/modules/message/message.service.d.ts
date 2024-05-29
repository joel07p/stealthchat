import { Repository } from 'typeorm';
import { Room } from '../room/room.entity';
import { UserService } from '../user/user.service';
import { Message } from './message.entity';
import { AddMessage, DeleteMessage } from './types';
export declare class MessageService {
    private readonly messageRepository;
    private readonly roomRepository;
    private readonly userService;
    private logger;
    constructor(messageRepository: Repository<Message>, roomRepository: Repository<Room>, userService: UserService);
    getMessage(roomId: string, relations: Array<string>): Promise<Message>;
    getMessages(userId: string, roomId: string): Promise<Message[]>;
    addMessage({ message, roomId }: AddMessage, userId: string): Promise<Message>;
    deleteMessage({ messageId, roomId }: DeleteMessage): Promise<import("typeorm").DeleteResult>;
    private addMessageToRoom;
}

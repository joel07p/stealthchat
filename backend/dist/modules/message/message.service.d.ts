import { Repository } from 'typeorm';
import { Room } from '../room/room.entity';
import { Message } from './message.entity';
import { AddMessage } from './types';
export declare class MessageService {
    private readonly messageRepository;
    private readonly roomRepository;
    private logger;
    constructor(messageRepository: Repository<Message>, roomRepository: Repository<Room>);
    addMessage({ message, username, roomId }: AddMessage): Promise<Message>;
    private addMessageToRoom;
}

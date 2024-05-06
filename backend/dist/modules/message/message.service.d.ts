import { Message } from './message.entity';
import { Repository } from 'typeorm';
export declare class MessageService {
    private readonly messageRepository;
    constructor(messageRepository: Repository<Message>);
}

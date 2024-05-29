import { MessageService } from './message.service';
import { AddMessage } from './types';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    getMessages(userId: string, roomId: string): Promise<import("src/modules/message/message.entity").Message[]>;
    addMessage(userId: string, message: AddMessage): Promise<import("src/modules/message/message.entity").Message>;
}

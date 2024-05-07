import { MessageService } from './message.service';
import { AddMessage } from './types';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    addMessage(message: AddMessage): Promise<import("src/modules/message/message.entity").Message>;
}

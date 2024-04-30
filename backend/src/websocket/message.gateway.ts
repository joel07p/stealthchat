import { WebSocketGateway } from "@nestjs/websockets";
import { MessageService } from "src/modules/message/message.service";

@WebSocketGateway()
export class MessageGateway {
    constructor(
        private readonly messageService: MessageService, 
    ) {}
}
import { OnGatewayInit } from "@nestjs/websockets";
import { MessageService } from "src/modules/message/message.service";
export declare class MessageGateway implements OnGatewayInit {
    private readonly messageService;
    private readonly logger;
    constructor(messageService: MessageService);
    afterInit(): void;
}

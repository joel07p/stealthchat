import { Logger } from "@nestjs/common";
import { OnGatewayInit, WebSocketGateway } from "@nestjs/websockets";
import { MessageService } from "src/modules/message/message.service";

@WebSocketGateway()
export class MessageGateway implements OnGatewayInit {
    private readonly logger = new Logger(MessageGateway.name)
    
    constructor(
        private readonly messageService: MessageService, 
    ) {}

    afterInit(): void {
        this.logger.log("Websocket Gateway initialized")
    }
}
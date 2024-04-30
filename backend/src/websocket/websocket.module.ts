import { Module } from "@nestjs/common";
import { MessageGateway } from "./message.gateway";
import { MessageService } from "src/modules/message/message.service";

@Module({
    imports: [],
    providers: [MessageGateway, MessageService],
    exports: []
})
export class WebSocketModule {}
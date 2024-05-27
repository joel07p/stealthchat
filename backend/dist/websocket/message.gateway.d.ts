import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from "@nestjs/websockets";
import { Namespace, Socket } from "socket.io";
import { AddMessageDTO, DeleteMessageDTO } from "src/modules/message";
import { MessageService } from "src/modules/message/message.service";
import { SocketWithAuth } from "./types";
export declare class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly messageService;
    private readonly logger;
    private roomToSocketsMap;
    io: Namespace;
    constructor(messageService: MessageService);
    afterInit(): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    test(client: SocketWithAuth): void;
    addMessage(data: AddMessageDTO): Promise<void>;
    deleteMessage(data: DeleteMessageDTO): Promise<void>;
}

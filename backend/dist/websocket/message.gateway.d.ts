import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from "@nestjs/websockets";
import { Namespace, Socket } from "socket.io";
import { AddMessageDTO } from "src/modules/message";
import { MessageService } from "src/modules/message/message.service";
import { SocketWithAuth } from "./types";
export declare class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly messageService;
    private readonly logger;
    io: Namespace;
    private roomToSocketsMap;
    constructor(messageService: MessageService);
    afterInit(): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    test(client: SocketWithAuth): void;
    addMessage(data: AddMessageDTO): Promise<void>;
}

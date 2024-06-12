import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from "@nestjs/websockets";
import { Namespace, Socket } from "socket.io";
import { AddMessageDTO, DeleteMessageDTO, UpdateMessageDTO } from "src/modules/message";
import { MessageService } from "src/modules/message/message.service";
import { EncryptionService } from "src/service/encryption.service";
import { SocketWithAuth } from "./types";
export declare class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly messageService;
    private readonly encryptionService;
    private readonly logger;
    private roomToSocketsMap;
    io: Namespace;
    constructor(messageService: MessageService, encryptionService: EncryptionService);
    afterInit(): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    addMessage(data: AddMessageDTO, client: SocketWithAuth): Promise<void>;
    updateessage(data: UpdateMessageDTO): Promise<void>;
    deleteMessage(data: DeleteMessageDTO): Promise<void>;
}

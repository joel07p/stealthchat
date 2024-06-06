import { ConflictException, Logger, UseGuards } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Namespace, Socket } from "socket.io";
import { AgainstViewerGuard, UserPermissionGuard } from "src/common/guards";
import { AddMessageDTO, DeleteMessageDTO } from "src/modules/message";
import { MessageService } from "src/modules/message/message.service";
import { EncryptionService } from "src/service/encryption.service";
import { addSocket, logConnectionChange, removeSocket, sendDataToSockets } from "src/utils/helpers/message-gateway";
import { MessageEvent } from "./message-event.enum";
import { SocketWithAuth } from "./types";
import { UserOwnsMessageGuard } from "src/common/guards/user-owns-message.guard";

@WebSocketGateway({
    namespace: "messages"
})
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(MessageGateway.name)
    private roomToSocketsMap: Map<string, Set<string>> = new Map<string, Set<string>>

    @WebSocketServer() io: Namespace

    constructor(
        private readonly messageService: MessageService,
        private readonly encryptionService: EncryptionService
    ) {}

    afterInit(): void {
        this.logger.log("Websocket Gateway initialized")
    }

    handleConnection(client: Socket): void {
        this.roomToSocketsMap = addSocket(client, this.roomToSocketsMap)
        logConnectionChange(this.io, client, this.logger)

        client.emit("server_public_key", this.encryptionService.getPublicKey())
    }

    handleDisconnect(client: Socket): void {
        this.roomToSocketsMap = removeSocket(client, this.roomToSocketsMap)
        logConnectionChange(this.io, client, this.logger)
    }

    @UseGuards(AgainstViewerGuard, UserPermissionGuard)
    @SubscribeMessage(MessageEvent.ADD_MESSAGE) 
    async addMessage(@MessageBody() data: AddMessageDTO, @ConnectedSocket() client: SocketWithAuth) {
        const createdMessage = await this.messageService.addMessage(data, client.userId)
        if(!createdMessage) throw new ConflictException("Message might not be created")

        sendDataToSockets(this.io, this.roomToSocketsMap, data.roomId, createdMessage, MessageEvent.ADD_MESSAGE_UPDATE)
    }

    @UseGuards(AgainstViewerGuard, UserPermissionGuard, UserOwnsMessageGuard)
    @SubscribeMessage(MessageEvent.DELETE_MESSAGE)
    async deleteMessage(@MessageBody() data: DeleteMessageDTO) {
        const deletedMessage = await this.messageService.deleteMessage(data)
        if(!deletedMessage) throw new ConflictException("Message might not be deleted")

        sendDataToSockets(this.io, this.roomToSocketsMap, data.roomId, deletedMessage, MessageEvent.DELETE_MESSAGE_UPDATE)
    }
}
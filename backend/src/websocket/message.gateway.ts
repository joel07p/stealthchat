import { ConflictException, Logger, UseGuards } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { log } from "console";
import { Namespace, Socket } from "socket.io";
import { AgainstViewerGuard, UserPermissionGuard } from "src/common/guards";
import { AddMessageDTO, DeleteMessageDTO } from "src/modules/message";
import { MessageService } from "src/modules/message/message.service";
import { addSocket, logConnectionChange, removeSocket, sendDataToSockets } from "src/utils/helpers/message-gateway";
import { SocketWithAuth } from "./types";
import { MessageEvent } from "./message-event.enum";

@WebSocketGateway({
    namespace: "messages"
})
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(MessageGateway.name)
    private roomToSocketsMap: Map<string, Set<string>> = new Map<string, Set<string>>

    @WebSocketServer() io: Namespace

    constructor(
        private readonly messageService: MessageService,
    ) {}

    afterInit(): void {
        this.logger.log("Websocket Gateway initialized")
    }

    handleConnection(client: Socket) {
        this.roomToSocketsMap = addSocket(client, this.roomToSocketsMap)
        
        logConnectionChange(this.io, client, this.logger)
    }

    handleDisconnect(client: Socket) {
        this.roomToSocketsMap = removeSocket(client, this.roomToSocketsMap)

        logConnectionChange(this.io, client, this.logger)
    }

    @UseGuards(AgainstViewerGuard) 
    @SubscribeMessage("test")
    test(@ConnectedSocket() client: SocketWithAuth) {
        log(client.userId)
        this.io.emit("test", {hello: "sui"})
    }

    @UseGuards(AgainstViewerGuard, UserPermissionGuard)
    @SubscribeMessage("add_message")
    async addMessage(@MessageBody() data: AddMessageDTO,) {
        const createdMessage = await this.messageService.addMessage(data)
        if(!createdMessage) throw new ConflictException("Message might not be created")

        sendDataToSockets(this.io, this.roomToSocketsMap, data.roomId, createdMessage, MessageEvent.ADD_MESSAGE_UPDATE)
    }

    @UseGuards(AgainstViewerGuard, UserPermissionGuard)
    @SubscribeMessage("delete_message")
    async deleteMessage(@MessageBody() data: DeleteMessageDTO) {
        const deletedMessage = await this.messageService.deleteMessage(data)
        if(!deletedMessage) throw new ConflictException("Message might not be deleted")

        sendDataToSockets(this.io, this.roomToSocketsMap, data.roomId, deletedMessage, MessageEvent.DELETE_MESSAGE_UPDATE)
    }
}
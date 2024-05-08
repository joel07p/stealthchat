import { Logger, UseGuards } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { log } from "console";
import { Namespace, Socket } from "socket.io";
import { AgainstViewerGuard, UserPermissionGuard } from "src/common/guards";
import { AddMessageDTO } from "src/modules/message";
import { MessageService } from "src/modules/message/message.service";
import { addSocket, logConnectionChange, removeSocket, sendDataToSockets } from "src/utils/helpers/message-gateway";
import { SocketWithAuth } from "./types";

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

    handleConnection(client: Socket, ...args: any[]) {
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
    async addMessage(@MessageBody() data: AddMessageDTO) {
        const message = await this.messageService.addMessage(data)

        if(message) {
            sendDataToSockets(this.io, this.roomToSocketsMap, data.roomId, message, "add_message_update")
        }
    }
}
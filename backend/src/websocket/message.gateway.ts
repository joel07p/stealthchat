import { Logger, UseGuards } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { log } from "console";
import { Namespace, Socket } from "socket.io";
import { AgainstViewerGuard } from "src/common/guards";
import { AddMessageDTO } from "src/modules/message";
import { MessageService } from "src/modules/message/message.service";
import { addSocket, sendDataToSockets } from "src/utils/helpers/message-gateway";
import { SocketWithAuth } from "./types";
import { UserPermissionGuard } from "src/common/guards/user-permission.guard";

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
        
        const sockets = this.io.sockets

        this.logger.debug(
            `Socket connected ${client}"`,
        );

        this.logger.log(`WS Client with id: ${client.id} connected!`);
        this.logger.debug(`Number of connected sockets: ${sockets.size}`)

        this.io.emit('Hello from', client.id)
    }

    handleDisconnect(client: Socket) {
        const sockets = this.io.sockets

        this.logger.log(`Disconnected socket id: ${client.id}`);
        this.logger.debug(`Number of connected sockets: ${sockets.size}`);
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
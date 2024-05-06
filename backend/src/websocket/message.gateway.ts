import { Logger, UseGuards } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { log } from "console";
import { Namespace, Socket } from "socket.io";
import { WebsocketJWTGuard } from "src/common/guards/ws-jwt.guard";
import { AddMessage } from "src/modules/message";
import { MessageService } from "src/modules/message/message.service";
import { addSocket } from "src/utils/helpers/message-gateway";
import { SocketWithAuth } from "./types";

@WebSocketGateway({
    namespace: "messages"
})
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(MessageGateway.name)
    
    @WebSocketServer() io: Namespace
    
    private roomToSocketsMap: Map<string, Set<string>> = new Map<string, Set<string>>

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
        this.io.emit("test", "test")
    }

    /*
    @SubscribeMessage("test")
    test(@ConnectedSocket() client: Socket, @MessageBody("roomId") roomId: string) {
        sendDataToSockets(this.io, this.roomToSocketsMap, roomId, {test: "test"}, "add_message_update")
    }*/

    @SubscribeMessage("add_message")
    async addMessage(@MessageBody() data: AddMessage) {
        /*const message = this.messageService.addMessage(data)

        if(message) {
            sendDataToSockets(this.io, this.roomToSocketsMap, data.roomId, message, "add_message_update")
        }*/
    }
}
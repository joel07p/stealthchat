import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { log } from "console";
import { Observable } from "rxjs";
import { RoomService } from "src/modules/room/room.service";
import { SocketWithAuth } from "src/websocket";

@Injectable()
export class UserPermissionGuard implements CanActivate {
    private logger = new Logger(UserPermissionGuard.name)

    constructor(
        private readonly roomService: RoomService
    ) {}

    async canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const socket: SocketWithAuth = context.switchToWs().getClient()
        const socketData = context.switchToWs().getData()
        log(socketData)
        const userId = socket.userId
        const roomId = socket
        return false
    }

}
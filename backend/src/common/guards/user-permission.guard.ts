import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { RoomService } from "src/modules/room/room.service";
import { UserService } from "src/modules/user/user.service";
import { SocketWithAuth } from "src/websocket";

@Injectable()
export class UserPermissionGuard implements CanActivate {
    private logger = new Logger(UserPermissionGuard.name)

    constructor(
        private readonly userService: UserService,
        private readonly roomService: RoomService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const socket: SocketWithAuth = context.switchToWs().getClient()

        const userId: string = socket.userId
        const roomId: string = socket.handshake.query.roomId?.toString()

        this.logger.log(`Trying to activate user ${userId} for room ${roomId}`)

        const userPermission: string = await this.userService.getUserProperty(userId, "permission")
        const room = await this.roomService.getRoom(roomId)

        if(userPermission && room) {
            const { permissions } = room

            permissions.forEach((permission) => {
                if(permission.name === userPermission) {
                    return true
                }
            })
        }

        return false
    }

}
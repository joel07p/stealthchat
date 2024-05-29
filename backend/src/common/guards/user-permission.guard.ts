import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { log } from "console";
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
        log(room)

        let permissionExistsOnRoom = false

        if(userPermission && room) {
            const { permissions } = room
            log(userPermission)
            log(permissions)
            permissions.forEach((permission) => {
                log(permission.name === userPermission)
                if(permission.name === userPermission) {
                    permissionExistsOnRoom = true
                    return
                }
            })
        }

        this.logger.log(`User with id ${userId} is activated: ${permissionExistsOnRoom}`)

        return permissionExistsOnRoom
    }

}
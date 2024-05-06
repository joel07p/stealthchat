import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { GroupService } from "src/modules/group/group.service";
import { SocketWithAuth } from "src/websocket";

@Injectable()
export class AgainstViewerGuard implements CanActivate {
    private logger = new Logger(AgainstViewerGuard.name)

    constructor(
        private readonly groupService: GroupService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        this.logger.log("Try to active against viewer guard")
        const socket: SocketWithAuth = context.switchToWs().getClient()

        const userId = socket.userId
        const groupId = (socket.handshake.headers.groupid || socket.handshake.headers['groupid'] || socket.handshake.headers['groupId']).toString()
        
        if(!userId || !groupId) return false

        const role = await this.groupService.getUserRole(userId, groupId)

        this.logger.log(`User with id ${userId} and role ${role} wants to be activated`)
        return (role === "admin" || role === "user")
    }
}
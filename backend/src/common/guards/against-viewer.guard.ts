/*import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { GroupService } from "src/modules/group/group.service";
import { SocketWithAuth } from "src/websocket";

@Injectable()
export class AgainstViewerGuard implements CanActivate {
    constructor(
        private readonly groupService: GroupService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const socket: SocketWithAuth = context.switchToWs().getClient()

        const userId = socket.userId
        const groupId = (socket.handshake.headers.groupid || socket.handshake.headers['groupid'] || socket.handshake.headers['groupId']).toString()
        
        const role = this.groupService.getUserRole(userId, groupId)



        return true
    }

}*/
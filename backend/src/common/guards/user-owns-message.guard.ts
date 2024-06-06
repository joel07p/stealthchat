import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { log } from "console";
import { MessageService } from "src/modules/message/message.service";
import { SocketWithAuth } from "src/websocket";

@Injectable()
export class UserOwnsMessageGuard implements CanActivate {
    private logger = new Logger(UserOwnsMessageGuard.name)
    
    constructor(
        private readonly messageService: MessageService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        this.logger.log(`Trying to check if the name of the user is the same as the username of the message`)

        const {username}: SocketWithAuth = context.switchToWs().getClient()
        log(context.switchToWs().getData())
        const {messageId}: {messageId: string} = context.switchToWs().getData()
        log(typeof messageId)

        this.messageService.sui()
        const message = await this.messageService.getMessageById(messageId)

        return username === message.username
    }
}
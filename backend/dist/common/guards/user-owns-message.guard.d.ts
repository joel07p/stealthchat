import { CanActivate, ExecutionContext } from "@nestjs/common";
import { MessageService } from "src/modules/message/message.service";
export declare class UserOwnsMessageGuard implements CanActivate {
    private readonly messageService;
    private logger;
    constructor(messageService: MessageService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

import { CanActivate, ExecutionContext } from "@nestjs/common";
import { GroupService } from "src/modules/group/group.service";
export declare class AgainstViewerGuard implements CanActivate {
    private readonly groupService;
    private logger;
    constructor(groupService: GroupService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

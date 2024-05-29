import { CanActivate, ExecutionContext } from "@nestjs/common";
import { RoomService } from "src/modules/room/room.service";
import { UserService } from "src/modules/user/user.service";
export declare class UserPermissionGuard implements CanActivate {
    private readonly userService;
    private readonly roomService;
    private logger;
    constructor(userService: UserService, roomService: RoomService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

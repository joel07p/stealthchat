"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UserPermissionGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const console_1 = require("console");
const room_service_1 = require("../../modules/room/room.service");
const user_service_1 = require("../../modules/user/user.service");
let UserPermissionGuard = UserPermissionGuard_1 = class UserPermissionGuard {
    constructor(userService, roomService) {
        this.userService = userService;
        this.roomService = roomService;
        this.logger = new common_1.Logger(UserPermissionGuard_1.name);
    }
    async canActivate(context) {
        const socket = context.switchToWs().getClient();
        const userId = socket.userId;
        const roomId = socket.handshake.query.roomId?.toString();
        this.logger.log(`Trying to activate user ${userId} for room ${roomId}`);
        const userPermission = await this.userService.getUserProperty(userId, "permission");
        const room = await this.roomService.getRoom(roomId);
        (0, console_1.log)(room);
        let permissionExistsOnRoom = false;
        if (userPermission && room) {
            const { permissions } = room;
            (0, console_1.log)(userPermission);
            (0, console_1.log)(permissions);
            permissions.forEach((permission) => {
                (0, console_1.log)(permission.name === userPermission);
                if (permission.name === userPermission) {
                    permissionExistsOnRoom = true;
                    return;
                }
            });
        }
        this.logger.log(`User with id ${userId} is activated: ${permissionExistsOnRoom}`);
        return permissionExistsOnRoom;
    }
};
exports.UserPermissionGuard = UserPermissionGuard;
exports.UserPermissionGuard = UserPermissionGuard = UserPermissionGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        room_service_1.RoomService])
], UserPermissionGuard);
//# sourceMappingURL=user-permission.guard.js.map
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
var AgainstViewerGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgainstViewerGuard = void 0;
const common_1 = require("@nestjs/common");
const console_1 = require("console");
const group_service_1 = require("../../modules/group/group.service");
let AgainstViewerGuard = AgainstViewerGuard_1 = class AgainstViewerGuard {
    constructor(groupService) {
        this.groupService = groupService;
        this.logger = new common_1.Logger(AgainstViewerGuard_1.name);
    }
    async canActivate(context) {
        this.logger.log("Try to active against viewer guard");
        const socket = context.switchToWs().getClient();
        const userId = socket.userId;
        const groupId = (socket.handshake.headers.groupid || socket.handshake.headers['groupid'] || socket.handshake.headers['groupId']).toString();
        console.log(userId);
        (0, console_1.log)(groupId);
        if (!userId || !groupId)
            return false;
        const role = await this.groupService.getUserRole(userId, groupId);
        this.logger.log(`User with id ${userId} and role ${role} wants to be activated`);
        return (role === "admin" || role === "user");
    }
};
exports.AgainstViewerGuard = AgainstViewerGuard;
exports.AgainstViewerGuard = AgainstViewerGuard = AgainstViewerGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [group_service_1.GroupService])
], AgainstViewerGuard);
//# sourceMappingURL=against-viewer.guard.js.map
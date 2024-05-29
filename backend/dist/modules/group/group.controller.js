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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../common/decorators");
const group_dto_1 = require("./group.dto");
const group_service_1 = require("./group.service");
let GroupController = class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    getGroup(groupId) {
        return this.groupService.getGroup(groupId, []);
    }
    getGroups(user) {
        return this.groupService.getGroups(user);
    }
    createGroup(userId, data) {
        return this.groupService.createGroup(userId, data);
    }
    joinGroup(userId, data) {
        return this.groupService.joinGroup(userId, data);
    }
    leaveGroup(userId, data) {
        return this.groupService.leaveGroup(userId, data);
    }
};
exports.GroupController = GroupController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getGroup", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getGroups", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, decorators_1.User)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, group_dto_1.CreateGroupDTO]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "createGroup", null);
__decorate([
    (0, common_1.Post)("join"),
    __param(0, (0, decorators_1.User)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, group_dto_1.JoinGroupDTO]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "joinGroup", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, decorators_1.User)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, group_dto_1.LeaveGroupDTO]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "leaveGroup", null);
exports.GroupController = GroupController = __decorate([
    (0, common_1.Controller)('group'),
    __metadata("design:paramtypes", [group_service_1.GroupService])
], GroupController);
//# sourceMappingURL=group.controller.js.map
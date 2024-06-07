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
exports.RoomController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../common/decorators");
const dtos_1 = require("./dtos");
const room_service_1 = require("./room.service");
let RoomController = class RoomController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    getRoom(roomId) {
        return this.roomService.getRoom(roomId);
    }
    getRooms(userId, groupId) {
        return this.roomService.getRooms({ groupId, userId });
    }
    async createRoom(userId, data) {
        const room = await this.roomService.createRoom(data);
        if (await this.roomService.checkIfUserHasPermission(userId, room)) {
            return room;
        }
    }
};
exports.RoomController = RoomController;
__decorate([
    (0, common_1.Get)(':roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "getRoom", null);
__decorate([
    (0, common_1.Get)('/group/:groupId'),
    __param(0, (0, decorators_1.User)("sub")),
    __param(1, (0, common_1.Param)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "getRooms", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, decorators_1.User)("sub")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.CreateRoomDTO]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "createRoom", null);
exports.RoomController = RoomController = __decorate([
    (0, common_1.Controller)('room'),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], RoomController);
//# sourceMappingURL=room.controller.js.map
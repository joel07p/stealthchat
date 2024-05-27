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
var RoomService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const room_entity_1 = require("./room.entity");
const typeorm_2 = require("typeorm");
const group_entity_1 = require("../group/group.entity");
const permission_entity_1 = require("../permission/permission.entity");
const user_service_1 = require("../user/user.service");
const console_1 = require("console");
let RoomService = RoomService_1 = class RoomService {
    constructor(roomRepository, groupRepository, permissionRepository, userService) {
        this.roomRepository = roomRepository;
        this.groupRepository = groupRepository;
        this.permissionRepository = permissionRepository;
        this.userService = userService;
        this.logger = new common_1.Logger(RoomService_1.name);
    }
    async getRoom(roomId) {
        return this.roomRepository.findOne({ where: { id: roomId }, relations: ['permissions'] });
    }
    async getRooms({ groupId, userId }) {
        this.logger.log(`Trying to fetch groups for group ${groupId}`);
        const userPermission = await this.userService.getUserProperty(userId, "permission");
        const rooms = await this.roomRepository.createQueryBuilder("room")
            .leftJoin("room.permissions", "permission")
            .where("room.group.id = :groupId", { groupId })
            .andWhere("permission.name = :permission", { permission: userPermission })
            .getMany();
        return rooms;
    }
    async createRoom({ name, permissions, groupId }) {
        this.logger.log(`Trying to create room with name: ${name}`);
        const roomInstance = new room_entity_1.Room(name);
        const room = await this.roomRepository.save(roomInstance);
        await this.setPermissionsToRoom(permissions, roomInstance);
        await this.saveRoomToGroup(groupId, roomInstance);
        return room;
    }
    async renameRoom({ roomId, newName }) {
        this.logger.log(`Trying to rename room with id: ${roomId} to ${newName}`);
        const room = await this.roomRepository.findOne({ where: { id: roomId } });
        if (!room)
            throw new common_1.NotFoundException(`Room with id ${roomId} not found`);
        room.name = newName;
        return await this.roomRepository.save(room);
    }
    async deleteRoom(roomId) {
        this.logger.log(`Trying to delet room with id: ${roomId}`);
        const roomToDelete = await this.roomRepository.findOne({ where: { id: roomId } });
        if (!roomToDelete)
            throw new common_1.NotFoundException(`Room with id ${roomId} not found`);
        return await this.roomRepository.delete(roomToDelete);
    }
    async setPermissionsToRoom(permissionNames, room) {
        this.logger.log("Trying to create permissions");
        for (const permissionName of permissionNames) {
            if (!await this.checkIfPermissionsExist(permissionName)) {
                this.logger.log(`Creating permission ${permissionName}`);
                const permission = new permission_entity_1.Permission(permissionName);
                const permissionFetched = await this.permissionRepository.save(permission);
                const fetchedRoom = await this.roomRepository.findOne({ where: { id: room.id }, relations: ['permissions'] });
                fetchedRoom.permissions.push(permissionFetched);
                await this.permissionRepository.save(permissionFetched);
                await this.roomRepository.save(fetchedRoom);
            }
            else {
                const roomFetched = await this.roomRepository.findOne({ where: { id: room.id }, relations: ['permissions'] });
                const permission = await this.permissionRepository.findOne({ where: { name: permissionName } });
                (0, console_1.log)(roomFetched);
                if (permission) {
                    roomFetched.permissions.push(permission);
                    await this.permissionRepository.save(permission);
                    await this.roomRepository.save(roomFetched);
                }
            }
        }
    }
    async checkIfUserHasPermission(userId, room) {
        const userPermission = await this.userService.getUserProperty(userId, "permission");
        const roomWithPermissions = await this.roomRepository.findOne({ where: { id: room.id }, relations: ['permissions'] });
        let hasPermission = false;
        (0, console_1.log)(userPermission);
        roomWithPermissions.permissions.forEach(permission => {
            if (permission.name === userPermission) {
                (0, console_1.log)("permission name: " + permission.name);
                hasPermission = true;
            }
        });
        return hasPermission;
    }
    async checkIfPermissionsExist(permissionName) {
        this.logger.log("Check if permission exists");
        const permission = await this.permissionRepository.findOne({ where: { name: permissionName } });
        if (permission)
            return true;
        else
            return false;
    }
    async saveRoomToGroup(groupId, room) {
        const group = await this.groupRepository.findOne({ where: { id: groupId } });
        if (!group)
            throw new common_1.NotFoundException(`Group ${groupId} not found`);
        room.group = group;
        await this.roomRepository.save(room);
    }
};
exports.RoomService = RoomService;
exports.RoomService = RoomService = RoomService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __param(1, (0, typeorm_1.InjectRepository)(group_entity_1.Group)),
    __param(2, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        user_service_1.UserService])
], RoomService);
//# sourceMappingURL=room.service.js.map
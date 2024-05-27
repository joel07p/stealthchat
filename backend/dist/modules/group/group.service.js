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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const authentication_entity_1 = require("../../auth/authentication.entity");
const typeorm_2 = require("typeorm");
const user_role_enum_1 = require("../user/user-role.enum");
const user_entity_1 = require("../user/user.entity");
const group_type_enum_1 = require("./group-type.enum");
const group_entity_1 = require("./group.entity");
const user_on_group_entity_1 = require("./user-on-group.entity");
const user_service_1 = require("../user/user.service");
const console_1 = require("console");
let GroupService = class GroupService {
    constructor(groupRepository, userRepository, userOnGroupsRepository, authenticationRepository, userService) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
        this.userOnGroupsRepository = userOnGroupsRepository;
        this.authenticationRepository = authenticationRepository;
        this.userService = userService;
    }
    async getGroups(user) {
        const thisUser = await this.userService.getUserProperty(user.sub, null);
        const groups = await this.groupRepository
            .createQueryBuilder('group')
            .innerJoinAndSelect(user_on_group_entity_1.UserOnGroups, 'userOnGroups', 'userOnGroups.groupId = group.id')
            .where('userOnGroups.userId = :userId', { userId: thisUser.id })
            .getMany();
        const transformedGroups = await Promise.all(groups.map(async (group) => {
            const thisUserOnGroup = await this.userOnGroupsRepository.findOne({
                where: {
                    user: {
                        id: thisUser.id
                    },
                    group: {
                        id: group.id
                    }
                }
            });
            console.log({
                id: group.id,
                name: group.name,
                type: group.type,
                users: 0,
                rooms: await this.countRoomsInGroup(group.id)
            });
            return {
                id: group.id,
                name: group.name,
                type: group.type,
                role: thisUserOnGroup ? thisUserOnGroup.role : null,
                users: 0,
                rooms: await this.countRoomsInGroup(group.id)
            };
        }));
        return transformedGroups;
    }
    async createGroup(userId, data) {
        const thisUser = await this.userRepository.findOne({ where: { id: userId }, relations: ['authentication'] });
        const { name, description, users } = data;
        if (thisUser)
            users.push(thisUser.authentication.getIdentityCode());
        const type = users.length < 3 ? group_type_enum_1.GroupType.SINGLE : group_type_enum_1.GroupType.MULTI;
        const joinCode = await this.generateJoinCode();
        const group = new group_entity_1.Group(name, description, type, joinCode);
        await this.groupRepository.save(group);
        for (const identityCode of users) {
            const authentication = await this.authenticationRepository.findOne({
                where: {
                    identityCode
                },
                relations: ['user']
            });
            if (authentication) {
                const newUserOnGroups = this.userOnGroupsRepository.create({
                    user: authentication.user,
                    group,
                    role: identityCode === thisUser.authentication.getIdentityCode() ? user_role_enum_1.UserRole.ADMIN : user_role_enum_1.UserRole.USER
                });
                await this.userOnGroupsRepository.save(newUserOnGroups);
            }
            else {
                throw new common_1.BadRequestException("No auth found");
            }
        }
        const group1 = await this.groupRepository.findOne({ where: { id: group.id } });
        const thisUserOnGroup = await this.userOnGroupsRepository.findOne({
            where: {
                user: {
                    id: thisUser.id
                },
                group: {
                    id: group1.id
                }
            }
        });
        console.log(thisUserOnGroup);
        return {
            id: group.id,
            name: group.name,
            type: group.type,
            role: thisUserOnGroup.role,
            users: 0,
            rooms: await this.countRoomsInGroup(group.id)
        };
    }
    async joinGroup(userId, data) {
        const thisUser = await this.getUser(userId);
        const { joinCode } = data;
        console.log(joinCode);
        const group = await this.groupRepository.findOne({
            where: {
                joinCode
            }
        });
        if (!group)
            throw new common_1.BadRequestException("Invalid join code");
        const userOnGroup = await this.userOnGroupsRepository.create({
            user: thisUser,
            group,
            role: user_role_enum_1.UserRole.USER
        });
        await this.userOnGroupsRepository.save(userOnGroup);
        console.log({
            id: group.id,
            name: group.name,
            type: group.type,
            role: userOnGroup.role,
            users: 0,
            rooms: await this.countRoomsInGroup(group.id)
        });
        return {
            id: group.id,
            name: group.name,
            type: group.type,
            role: userOnGroup.role,
            users: 0,
            rooms: await this.countRoomsInGroup(group.id)
        };
    }
    async leaveGroup(userId, data) {
        const { groupId } = data;
        console.log(groupId);
        console.log(userId);
        const group = await this.groupRepository.findOne({
            where: {
                id: groupId
            }
        });
        if (!group)
            throw new common_1.NotFoundException("Group not found");
        const userOnGroup = await this.userOnGroupsRepository.findOne({
            where: {
                user: {
                    id: userId
                },
                group: {
                    id: groupId
                }
            }
        });
        if (!userOnGroup)
            throw new common_1.NotFoundException("Relation not found");
        return await this.userOnGroupsRepository.remove(userOnGroup);
    }
    async getUserRole(userId, groupId) {
        const userOnGroup = await this.userOnGroupsRepository.findOne({
            where: {
                group: {
                    id: groupId
                },
                user: {
                    id: userId
                }
            }
        });
        (0, console_1.log)(userOnGroup);
        return userOnGroup.role;
    }
    async getUser(userId) {
        return await this.userRepository.findOne({
            where: {
                id: userId
            }
        });
    }
    async generateJoinCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let result = '#';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    async getGroup(groupId, relations) {
        return await this.groupRepository.findOne({ where: { id: groupId }, relations });
    }
    async countRoomsInGroup(groupId) {
        const group = await this.getGroup(groupId, ["rooms"]);
        if (!group)
            throw new common_1.NotFoundException(`No such group ${groupId}`);
        (0, console_1.log)(group.rooms.length);
        return group.rooms.length.valueOf();
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(group_entity_1.Group)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(user_on_group_entity_1.UserOnGroups)),
    __param(3, (0, typeorm_1.InjectRepository)(authentication_entity_1.Authentication)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        user_service_1.UserService])
], GroupService);
//# sourceMappingURL=group.service.js.map
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
let GroupService = class GroupService {
    constructor(groupRepository, userRepository, userOnGroupsRepository, authenticationRepository) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
        this.userOnGroupsRepository = userOnGroupsRepository;
        this.authenticationRepository = authenticationRepository;
    }
    async getGroups() { }
    async createGroup(data) {
        const { name, description, users } = data;
        const type = users.length < 2 ? group_type_enum_1.GroupType.SINGLE : group_type_enum_1.GroupType.MULTI;
        const group = new group_entity_1.Group(name, description, type);
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
                    role: user_role_enum_1.UserRole.ADMIN
                });
                await this.userOnGroupsRepository.save(newUserOnGroups);
            }
            else {
                throw new common_1.BadRequestException();
            }
        }
    }
    async joinGroup(user, data) {
        const { joinCode } = data;
        const group = await this.groupRepository.findOne({
            where: {
                joinCode
            }
        });
        if (!group)
            throw new common_1.BadRequestException("Invalid join code");
        const userOnGroup = await this.userOnGroupsRepository.create({
            user,
            group,
            role: user_role_enum_1.UserRole.USER
        });
        await this.userOnGroupsRepository.save(userOnGroup);
    }
    async leaveGroup(user, data) {
        const { groupId } = data;
        const group = await this.groupRepository.findOne({
            where: {
                id: groupId
            }
        });
        const userOnGroup = await this.userOnGroupsRepository.findOne({
            where: {
                user,
                group
            }
        });
        await this.userOnGroupsRepository.remove(userOnGroup);
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
        typeorm_2.Repository])
], GroupService);
//# sourceMappingURL=group.service.js.map
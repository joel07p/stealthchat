"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModule = void 0;
const common_1 = require("@nestjs/common");
const group_service_1 = require("./group.service");
const group_controller_1 = require("./group.controller");
const typeorm_1 = require("@nestjs/typeorm");
const group_entity_1 = require("./group.entity");
const user_on_group_entity_1 = require("./user-on-group.entity");
const authentication_entity_1 = require("../../auth/authentication.entity");
const user_entity_1 = require("../user/user.entity");
const user_service_1 = require("../user/user.service");
let GroupModule = class GroupModule {
};
exports.GroupModule = GroupModule;
exports.GroupModule = GroupModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, authentication_entity_1.Authentication, group_entity_1.Group, user_on_group_entity_1.UserOnGroups])],
        providers: [group_service_1.GroupService, user_service_1.UserService],
        controllers: [group_controller_1.GroupController],
        exports: [group_service_1.GroupService]
    })
], GroupModule);
//# sourceMappingURL=group.module.js.map
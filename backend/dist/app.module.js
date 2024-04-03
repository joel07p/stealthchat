"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
<<<<<<< HEAD
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const group_module_1 = require("./modules/group/group.module");
const invitation_module_1 = require("./modules/invitation/invitation.module");
const message_module_1 = require("./modules/message/message.module");
const permission_module_1 = require("./modules/permission/permission.module");
const room_module_1 = require("./modules/room/room.module");
const user_module_1 = require("./modules/user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./modules/user/user.entity");
const user_service_1 = require("./modules/user/user.service");
const authentication_entity_1 = require("./auth/authentication.entity");
=======
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_service_1 = require("./user/user.service");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const group_module_1 = require("./group/group.module");
const invitation_module_1 = require("./invitation/invitation.module");
const room_module_1 = require("./room/room.module");
const message_service_1 = require("./message/message.service");
const message_controller_1 = require("./message/message.controller");
const message_module_1 = require("./message/message.module");
>>>>>>> 822aca9d10b7325e68f388c3c26962881af91ccf
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
<<<<<<< HEAD
        imports: [
            config_1.ConfigModule.forRoot(),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            group_module_1.GroupModule,
            invitation_module_1.InvitationModule,
            room_module_1.RoomModule,
            message_module_1.MessageModule,
            permission_module_1.PermissionModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: '193.135.10.73',
                port: 3306,
                username: 'deployment',
                password: '37F(MmN.(YAI',
                database: 'dev1',
                entities: [user_entity_1.User, authentication_entity_1.Authentication],
                synchronize: true
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, authentication_entity_1.Authentication])
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, user_service_1.UserService],
=======
        imports: [user_module_1.UserModule, auth_module_1.AuthModule, group_module_1.GroupModule, invitation_module_1.InvitationModule, room_module_1.RoomModule, message_module_1.MessageModule],
        controllers: [app_controller_1.AppController, message_controller_1.MessageController],
        providers: [app_service_1.AppService, user_service_1.UserService, message_service_1.MessageService],
>>>>>>> 822aca9d10b7325e68f388c3c26962881af91ccf
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
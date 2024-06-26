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
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const authentication_entity_1 = require("./auth/authentication.entity");
const error_1 = require("./common/error");
const guards_1 = require("./common/guards");
const group_entity_1 = require("./modules/group/group.entity");
const group_module_1 = require("./modules/group/group.module");
const user_on_group_entity_1 = require("./modules/group/user-on-group.entity");
const invitation_entity_1 = require("./modules/invitation/invitation.entity");
const invitation_module_1 = require("./modules/invitation/invitation.module");
const message_entity_1 = require("./modules/message/message.entity");
const message_module_1 = require("./modules/message/message.module");
const permission_entity_1 = require("./modules/permission/permission.entity");
const permission_module_1 = require("./modules/permission/permission.module");
const room_entity_1 = require("./modules/room/room.entity");
const room_module_1 = require("./modules/room/room.module");
const user_context_1 = require("./modules/user/user-context");
const user_entity_1 = require("./modules/user/user.entity");
const user_module_1 = require("./modules/user/user.module");
const user_service_1 = require("./modules/user/user.service");
const websocket_module_1 = require("./websocket/websocket.module");
const file_module_1 = require("./modules/file/file.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true
            }),
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
                host: process.env.HOST_DB,
                port: parseInt(process.env.PORT_DB),
                username: process.env.USERNAME_DB,
                password: process.env.PASSWORD_DB,
                database: process.env.DB_NAME,
                entities: [user_entity_1.User, authentication_entity_1.Authentication, group_entity_1.Group, user_on_group_entity_1.UserOnGroups, room_entity_1.Room, message_entity_1.Message, permission_entity_1.Permission, invitation_entity_1.Invitation],
                synchronize: true
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, authentication_entity_1.Authentication]),
            file_module_1.FileModule,
            websocket_module_1.WebSocketModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            user_service_1.UserService,
            user_context_1.UserContext,
            jwt_1.JwtService,
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.AtGuard
            },
            {
                provide: core_1.APP_FILTER,
                useClass: error_1.NotFoundExceptionFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
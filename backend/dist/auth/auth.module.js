"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../modules/user/user.entity");
const authentication_entity_1 = require("./authentication.entity");
const jwt_1 = require("@nestjs/jwt");
const user_context_1 = require("../modules/user/user-context");
const config_1 = require("@nestjs/config");
const strategies_1 = require("./strategies");
const otp_service_1 = require("./otp.service");
const mail_service_1 = require("../service/mail.service");
const user_on_group_entity_1 = require("../modules/group/user-on-group.entity");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, authentication_entity_1.Authentication, user_on_group_entity_1.UserOnGroups]),
            jwt_1.JwtModule.register({})
        ],
        providers: [auth_service_1.AuthService, user_context_1.UserContext, config_1.ConfigService, strategies_1.AtStrategy, strategies_1.RtStrategy, otp_service_1.OTPService, mail_service_1.MailService],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map
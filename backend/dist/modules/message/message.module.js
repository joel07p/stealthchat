"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const room_entity_1 = require("../room/room.entity");
const message_entity_1 = require("./message.entity");
const message_service_1 = require("./message.service");
const message_controller_1 = require("./message.controller");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../user/user.entity");
const authentication_entity_1 = require("../../auth/authentication.entity");
let MessageModule = class MessageModule {
};
exports.MessageModule = MessageModule;
exports.MessageModule = MessageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([message_entity_1.Message, room_entity_1.Room, user_entity_1.User, authentication_entity_1.Authentication])
        ],
        providers: [message_service_1.MessageService, user_service_1.UserService],
        controllers: [message_controller_1.MessageController]
    })
], MessageModule);
//# sourceMappingURL=message.module.js.map
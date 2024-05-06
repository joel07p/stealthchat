"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const group_entity_1 = require("../modules/group/group.entity");
const group_module_1 = require("../modules/group/group.module");
const user_on_group_entity_1 = require("../modules/group/user-on-group.entity");
const message_entity_1 = require("../modules/message/message.entity");
const message_service_1 = require("../modules/message/message.service");
const user_entity_1 = require("../modules/user/user.entity");
const message_gateway_1 = require("./message.gateway");
let WebSocketModule = class WebSocketModule {
};
exports.WebSocketModule = WebSocketModule;
exports.WebSocketModule = WebSocketModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([message_entity_1.Message, user_entity_1.User, group_entity_1.Group, user_on_group_entity_1.UserOnGroups]),
            group_module_1.GroupModule
        ],
        providers: [message_gateway_1.MessageGateway, message_service_1.MessageService, jwt_1.JwtService],
        exports: []
    })
], WebSocketModule);
//# sourceMappingURL=websocket.module.js.map
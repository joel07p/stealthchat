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
var MessageGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const guards_1 = require("../common/guards");
const message_1 = require("../modules/message");
const message_service_1 = require("../modules/message/message.service");
const encryption_service_1 = require("../service/encryption.service");
const message_gateway_1 = require("../utils/helpers/message-gateway");
const message_event_enum_1 = require("./message-event.enum");
const user_owns_message_guard_1 = require("../common/guards/user-owns-message.guard");
let MessageGateway = MessageGateway_1 = class MessageGateway {
    constructor(messageService, encryptionService) {
        this.messageService = messageService;
        this.encryptionService = encryptionService;
        this.logger = new common_1.Logger(MessageGateway_1.name);
        this.roomToSocketsMap = new Map;
    }
    afterInit() {
        this.logger.log("Websocket Gateway initialized");
    }
    handleConnection(client) {
        this.roomToSocketsMap = (0, message_gateway_1.addSocket)(client, this.roomToSocketsMap);
        (0, message_gateway_1.logConnectionChange)(this.io, client, this.logger);
        client.emit("server_public_key", this.encryptionService.getPublicKey());
    }
    handleDisconnect(client) {
        this.roomToSocketsMap = (0, message_gateway_1.removeSocket)(client, this.roomToSocketsMap);
        (0, message_gateway_1.logConnectionChange)(this.io, client, this.logger);
    }
    async addMessage(data, client) {
        const createdMessage = await this.messageService.addMessage(data, client.userId);
        if (!createdMessage)
            throw new common_1.ConflictException("Message might not be created");
        (0, message_gateway_1.sendDataToSockets)(this.io, this.roomToSocketsMap, data.roomId, createdMessage, message_event_enum_1.MessageEvent.ADD_MESSAGE_UPDATE);
    }
    async updateessage(data) {
        const updatedMessage = await this.messageService.updateMessageText(data);
        if (!updatedMessage)
            throw new common_1.ConflictException("Message might not be updated");
        (0, message_gateway_1.sendDataToSockets)(this.io, this.roomToSocketsMap, data.roomId, updatedMessage, message_event_enum_1.MessageEvent.UPDATE_MESSAGE_UPDATE);
    }
    async deleteMessage(data) {
        const deletedMessage = await this.messageService.deleteMessage(data);
        if (!deletedMessage)
            throw new common_1.ConflictException("Message might not be deleted");
        (0, message_gateway_1.sendDataToSockets)(this.io, this.roomToSocketsMap, data.roomId, deletedMessage, message_event_enum_1.MessageEvent.DELETE_MESSAGE_UPDATE);
    }
};
exports.MessageGateway = MessageGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Namespace)
], MessageGateway.prototype, "io", void 0);
__decorate([
    (0, common_1.UseGuards)(guards_1.AgainstViewerGuard, guards_1.UserPermissionGuard),
    (0, websockets_1.SubscribeMessage)(message_event_enum_1.MessageEvent.ADD_MESSAGE),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_1.AddMessageDTO, Object]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "addMessage", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AgainstViewerGuard, guards_1.UserPermissionGuard, user_owns_message_guard_1.UserOwnsMessageGuard),
    (0, websockets_1.SubscribeMessage)(message_event_enum_1.MessageEvent.UPDATE_MESSAGE),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_1.UpdateMessageDTO]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "updateessage", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AgainstViewerGuard, guards_1.UserPermissionGuard, user_owns_message_guard_1.UserOwnsMessageGuard),
    (0, websockets_1.SubscribeMessage)(message_event_enum_1.MessageEvent.DELETE_MESSAGE),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_1.DeleteMessageDTO]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "deleteMessage", null);
exports.MessageGateway = MessageGateway = MessageGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: "messages"
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        encryption_service_1.EncryptionService])
], MessageGateway);
//# sourceMappingURL=message.gateway.js.map
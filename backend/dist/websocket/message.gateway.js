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
const console_1 = require("console");
const socket_io_1 = require("socket.io");
const guards_1 = require("../common/guards");
const message_1 = require("../modules/message");
const message_service_1 = require("../modules/message/message.service");
const message_gateway_1 = require("../utils/helpers/message-gateway");
let MessageGateway = MessageGateway_1 = class MessageGateway {
    constructor(messageService) {
        this.messageService = messageService;
        this.logger = new common_1.Logger(MessageGateway_1.name);
        this.roomToSocketsMap = new Map;
    }
    afterInit() {
        this.logger.log("Websocket Gateway initialized");
    }
    handleConnection(client, ...args) {
        this.roomToSocketsMap = (0, message_gateway_1.addSocket)(client, this.roomToSocketsMap);
        const sockets = this.io.sockets;
        this.logger.debug(`Socket connected ${client}"`);
        this.logger.log(`WS Client with id: ${client.id} connected!`);
        this.logger.debug(`Number of connected sockets: ${sockets.size}`);
        this.io.emit('Hello from', client.id);
    }
    handleDisconnect(client) {
        const sockets = this.io.sockets;
        this.logger.log(`Disconnected socket id: ${client.id}`);
        this.logger.debug(`Number of connected sockets: ${sockets.size}`);
    }
    test(client) {
        (0, console_1.log)(client.userId);
        this.io.emit("test", { hello: "sui" });
    }
    async addMessage(data) {
        const message = await this.messageService.addMessage(data);
        if (message) {
            (0, message_gateway_1.sendDataToSockets)(this.io, this.roomToSocketsMap, data.roomId, message, "add_message_update");
        }
    }
};
exports.MessageGateway = MessageGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Namespace)
], MessageGateway.prototype, "io", void 0);
__decorate([
    (0, common_1.UseGuards)(guards_1.AgainstViewerGuard),
    (0, websockets_1.SubscribeMessage)("test"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessageGateway.prototype, "test", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AgainstViewerGuard),
    (0, websockets_1.SubscribeMessage)("add_message"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_1.AddMessageDTO]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "addMessage", null);
exports.MessageGateway = MessageGateway = MessageGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: "messages"
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageGateway);
//# sourceMappingURL=message.gateway.js.map
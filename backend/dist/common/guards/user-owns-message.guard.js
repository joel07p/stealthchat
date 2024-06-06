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
var UserOwnsMessageGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOwnsMessageGuard = void 0;
const common_1 = require("@nestjs/common");
const console_1 = require("console");
const message_service_1 = require("../../modules/message/message.service");
let UserOwnsMessageGuard = UserOwnsMessageGuard_1 = class UserOwnsMessageGuard {
    constructor(messageService) {
        this.messageService = messageService;
        this.logger = new common_1.Logger(UserOwnsMessageGuard_1.name);
    }
    async canActivate(context) {
        this.logger.log(`Trying to check if the name of the user is the same as the username of the message`);
        const { username } = context.switchToWs().getClient();
        (0, console_1.log)(context.switchToWs().getData());
        const { messageId } = context.switchToWs().getData();
        (0, console_1.log)(typeof messageId);
        this.messageService.sui();
        const message = await this.messageService.getMessageById(messageId);
        return username === message.username;
    }
};
exports.UserOwnsMessageGuard = UserOwnsMessageGuard;
exports.UserOwnsMessageGuard = UserOwnsMessageGuard = UserOwnsMessageGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], UserOwnsMessageGuard);
//# sourceMappingURL=user-owns-message.guard.js.map
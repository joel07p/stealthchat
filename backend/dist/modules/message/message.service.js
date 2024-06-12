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
var MessageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const console_1 = require("console");
const typeorm_2 = require("typeorm");
const room_entity_1 = require("../room/room.entity");
const user_service_1 = require("../user/user.service");
const message_entity_1 = require("./message.entity");
let MessageService = MessageService_1 = class MessageService {
    constructor(messageRepository, roomRepository, userService) {
        this.messageRepository = messageRepository;
        this.roomRepository = roomRepository;
        this.userService = userService;
        this.logger = new common_1.Logger(MessageService_1.name);
    }
    sui() {
        (0, console_1.log)("sui");
    }
    async getMessageById(messageId) {
        (0, console_1.log)("message + " + messageId);
        return await this.messageRepository.findOne({ where: { id: messageId } });
        return { username: "sui" };
    }
    async getMessage(messageId, relations) {
        return await this.messageRepository.findOne({ where: { id: messageId }, relations });
    }
    async getMessages(userId, roomId) {
        this.logger.log(`Trying to get messages for room ${roomId}`);
        return await this.messageRepository.find({
            where: { room: { id: roomId } },
            relations: ['room'],
            order: { sentAt: 'DESC' },
        });
    }
    async addMessage({ message, roomId }, userId) {
        this.logger.log(`Trying to create message in room ${roomId}`);
        const username = await this.userService.getUserProperty(userId, "username");
        const messageInstance = new message_entity_1.Message(message, username, null);
        const savedMessage = await this.messageRepository.save(messageInstance);
        await this.addMessageToRoom(roomId, savedMessage);
        this.logger.log("Message created");
        return savedMessage;
    }
    async updateMessageText({ messageId, roomId, messageText }) {
        const message = await this.getMessage(messageId, ["room"]);
        if (!(message.room.id === roomId))
            throw new common_1.ForbiddenException();
        const updatedMessage = await this.messageRepository.save({ ...message, message: messageText });
        this.logger.log("Message updated");
        return updatedMessage;
    }
    async deleteMessage({ messageId, roomId }) {
        this.logger.log(`Trying to delete message with id ${messageId} in room ${roomId}`);
        const message = await this.getMessage(messageId, ['room']);
        if (message && (message.room.id === roomId)) {
            await this.messageRepository.delete(message);
            return message;
        }
        else {
            throw new common_1.NotFoundException(`Message ${messageId} not found`);
        }
    }
    async addMessageToRoom(roomId, message) {
        this.logger.log(`Trying to save message in room ${roomId}`);
        const room = await this.roomRepository.findOne({ where: { id: roomId } });
        if (room) {
            message.room = room;
            await this.messageRepository.save(message);
        }
        else {
            throw new common_1.NotFoundException();
        }
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = MessageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __param(1, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        user_service_1.UserService])
], MessageService);
//# sourceMappingURL=message.service.js.map
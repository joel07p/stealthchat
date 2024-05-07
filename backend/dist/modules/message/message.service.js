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
const typeorm_2 = require("typeorm");
const room_entity_1 = require("../room/room.entity");
const message_entity_1 = require("./message.entity");
let MessageService = MessageService_1 = class MessageService {
    constructor(messageRepository, roomRepository) {
        this.messageRepository = messageRepository;
        this.roomRepository = roomRepository;
        this.logger = new common_1.Logger(MessageService_1.name);
    }
    async addMessage({ message, username, roomId }) {
        this.logger.log(`Trying to create message in room ${roomId}`);
        const messageInstance = new message_entity_1.Message(message, username, null);
        const savedMessage = await this.messageRepository.save(messageInstance);
        await this.addMessageToRoom(roomId, savedMessage);
        this.logger.log("Message created");
        return savedMessage;
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
        typeorm_2.Repository])
], MessageService);
//# sourceMappingURL=message.service.js.map
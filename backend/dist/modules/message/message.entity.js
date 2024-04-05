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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const class_validator_1 = require("class-validator");
const crypto_1 = require("crypto");
const typeorm_1 = require("typeorm");
const room_entity_1 = require("../room/room.entity");
let Message = class Message {
    constructor(message, username, content) {
        this.id = (0, crypto_1.randomUUID)();
        this.message = message;
        this.username = username;
        this.content = content;
        this.sentAt = new Date();
    }
};
exports.Message = Message;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "uuid", name: "id", unique: true, nullable: false }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], Message.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", name: "message" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 255),
    __metadata("design:type", String)
], Message.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", name: "content" }),
    __metadata("design:type", Object)
], Message.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", name: "username", unique: true, nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 50),
    __metadata("design:type", String)
], Message.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Message.prototype, "sentAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_entity_1.Room, (room) => room.messages),
    __metadata("design:type", room_entity_1.Room)
], Message.prototype, "room", void 0);
exports.Message = Message = __decorate([
    (0, typeorm_1.Entity)({ name: "messages" }),
    __metadata("design:paramtypes", [String, String, Object])
], Message);
//# sourceMappingURL=message.entity.js.map
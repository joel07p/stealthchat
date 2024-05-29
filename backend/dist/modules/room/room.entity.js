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
exports.Room = void 0;
const class_validator_1 = require("class-validator");
const crypto_1 = require("crypto");
const typeorm_1 = require("typeorm");
const group_entity_1 = require("../group/group.entity");
const message_entity_1 = require("../message/message.entity");
const permission_entity_1 = require("../permission/permission.entity");
let Room = class Room {
    constructor(name) {
        this.id = (0, crypto_1.randomUUID)();
        this.name = name;
    }
};
exports.Room = Room;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "uuid", name: "uuid", unique: true, nullable: false }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], Room.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", name: "name" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 50),
    __metadata("design:type", String)
], Room.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (message) => message.room, { cascade: true }),
    __metadata("design:type", Array)
], Room.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => permission_entity_1.Permission, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Room.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.Group, (group) => group.rooms),
    __metadata("design:type", group_entity_1.Group)
], Room.prototype, "group", void 0);
exports.Room = Room = __decorate([
    (0, typeorm_1.Entity)({ name: "rooms" }),
    __metadata("design:paramtypes", [String])
], Room);
//# sourceMappingURL=room.entity.js.map
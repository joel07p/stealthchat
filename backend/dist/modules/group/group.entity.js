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
exports.Group = void 0;
const class_validator_1 = require("class-validator");
const crypto_1 = require("crypto");
const typeorm_1 = require("typeorm");
const invitation_entity_1 = require("../invitation/invitation.entity");
const room_entity_1 = require("../room/room.entity");
const group_type_enum_1 = require("./group-type.enum");
const user_on_group_entity_1 = require("./user-on-group.entity");
let Group = class Group {
    constructor(name, description, type, joinCode) {
        this.id = (0, crypto_1.randomUUID)();
        this.name = name;
        this.description = description;
        this.type = type;
        this.joinCode = joinCode;
    }
};
exports.Group = Group;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "uuid", name: "id", unique: true, nullable: false }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], Group.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: "varchar", name: "name", unique: true, nullable: false }),
    (0, class_validator_1.Length)(5, 50),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: "varchar", name: "description" }),
    (0, class_validator_1.Length)(0, 255),
    __metadata("design:type", String)
], Group.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", name: "type", default: group_type_enum_1.GroupType.MULTI }),
    __metadata("design:type", String)
], Group.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", name: "joinCode", unique: true, nullable: true }),
    __metadata("design:type", String)
], Group.prototype, "joinCode", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Group.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => room_entity_1.Room, (room) => room.group, { cascade: true }),
    __metadata("design:type", Array)
], Group.prototype, "rooms", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => invitation_entity_1.Invitation, (invitation) => invitation.group, { cascade: true }),
    __metadata("design:type", Array)
], Group.prototype, "invitations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_on_group_entity_1.UserOnGroups, userOnGroups => userOnGroups.user),
    __metadata("design:type", Array)
], Group.prototype, "userOnGroups", void 0);
exports.Group = Group = __decorate([
    (0, typeorm_1.Entity)({ name: "groups" }),
    __metadata("design:paramtypes", [String, String, String, String])
], Group);
//# sourceMappingURL=group.entity.js.map
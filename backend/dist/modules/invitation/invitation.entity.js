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
exports.Invitation = void 0;
const class_validator_1 = require("class-validator");
const crypto_1 = require("crypto");
const typeorm_1 = require("typeorm");
const group_entity_1 = require("../group/group.entity");
let Invitation = class Invitation {
    constructor(message, identityCode, joinCode, expiresAt) {
        this.id = (0, crypto_1.randomUUID)();
        this.message = message;
        this.identityCode = identityCode;
        this.joinCode = joinCode;
        this.expiresAt = expiresAt;
    }
};
exports.Invitation = Invitation;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "uuid", name: "id", unique: true, nullable: false }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], Invitation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", name: "message" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 255),
    __metadata("design:type", String)
], Invitation.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", name: "identityCode", unique: true, nullable: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Invitation.prototype, "identityCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", name: "accessCode", unique: true, nullable: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Invitation.prototype, "joinCode", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', name: "sentAt" }),
    __metadata("design:type", Date)
], Invitation.prototype, "sentAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", name: "expiresAt", nullable: false }),
    __metadata("design:type", Date)
], Invitation.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.Group, (group) => group.invitations),
    __metadata("design:type", group_entity_1.Group)
], Invitation.prototype, "group", void 0);
exports.Invitation = Invitation = __decorate([
    (0, typeorm_1.Entity)({ name: "invitations" }),
    __metadata("design:paramtypes", [String, String, String, Date])
], Invitation);
//# sourceMappingURL=invitation.entity.js.map
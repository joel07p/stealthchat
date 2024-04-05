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
exports.Permission = void 0;
const class_validator_1 = require("class-validator");
const crypto_1 = require("crypto");
const typeorm_1 = require("typeorm");
const room_entity_1 = require("../room/room.entity");
let Permission = class Permission {
    constructor(name) {
        this.id = (0, crypto_1.randomUUID)();
        this.name = name;
    }
};
exports.Permission = Permission;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "uuid", name: "uuid", unique: true, nullable: false }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], Permission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", name: "name", nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 50),
    __metadata("design:type", String)
], Permission.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_entity_1.Room, (room) => room.permissions),
    __metadata("design:type", room_entity_1.Room)
], Permission.prototype, "room", void 0);
exports.Permission = Permission = __decorate([
    (0, typeorm_1.Entity)({ name: "permissions" }),
    __metadata("design:paramtypes", [String])
], Permission);
//# sourceMappingURL=permission.entity.js.map
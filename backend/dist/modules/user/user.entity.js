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
exports.User = void 0;
const class_validator_1 = require("class-validator");
const crypto_1 = require("crypto");
const authentication_entity_1 = require("../../auth/authentication.entity");
const typeorm_1 = require("typeorm");
const user_on_group_entity_1 = require("../group/user-on-group.entity");
let User = class User {
    constructor(username, email, authentication) {
        this.id = (0, crypto_1.randomUUID)();
        this.username = username;
        this.email = email;
        this.permission = "default";
        this.authentication = authentication;
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'uuid', name: "id", unique: true, nullable: false }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: "username", unique: true, nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 50),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: "permission", unique: false, nullable: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "permission", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: "email", unique: true, nullable: false }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => authentication_entity_1.Authentication),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", authentication_entity_1.Authentication)
], User.prototype, "authentication", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_on_group_entity_1.UserOnGroups, userOnGroups => userOnGroups.user),
    __metadata("design:type", Array)
], User.prototype, "userOnGroups", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' }),
    __metadata("design:paramtypes", [String, String, authentication_entity_1.Authentication])
], User);
//# sourceMappingURL=user.entity.js.map
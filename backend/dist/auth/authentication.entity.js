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
exports.Authentication = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const crypto_1 = require("crypto");
<<<<<<< HEAD
const user_entity_1 = require("../modules/user/user.entity");
=======
const user_entity_1 = require("../user/user.entity");
>>>>>>> 822aca9d10b7325e68f388c3c26962881af91ccf
let Authentication = class Authentication {
    constructor() {
        this.id = (0, crypto_1.randomUUID)();
    }
    setHash(hash) {
        this.hash = hash;
        return this;
    }
    setRefreshToken(refreshToken) {
        this.refreshToken = refreshToken;
        return this;
    }
    setIdentityCode(identityCode) {
        this.identityCode = identityCode;
        return this;
    }
    getHash() {
        return this.hash;
    }
    getRefreshToken() {
        return this.refreshToken;
    }
    getIdentityCode() {
        return this.identityCode;
    }
};
exports.Authentication = Authentication;
__decorate([
<<<<<<< HEAD
    (0, typeorm_1.PrimaryColumn)({ type: "uuid", name: "id", unique: true, nullable: false }),
=======
    (0, typeorm_1.PrimaryColumn)({ type: 'uuid', name: "id", unique: true, nullable: false }),
>>>>>>> 822aca9d10b7325e68f388c3c26962881af91ccf
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], Authentication.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", name: "hash", nullable: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Authentication.prototype, "hash", void 0);
__decorate([
<<<<<<< HEAD
    (0, typeorm_1.Column)({ type: "varchar", name: "refreshToken", nullable: true }),
=======
    (0, typeorm_1.Column)({ type: "varchar", name: "refreshToken" }),
>>>>>>> 822aca9d10b7325e68f388c3c26962881af91ccf
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Min)(50),
    __metadata("design:type", String)
], Authentication.prototype, "refreshToken", void 0);
__decorate([
<<<<<<< HEAD
    (0, typeorm_1.Column)({ type: "varchar", name: "identityCode", nullable: true }),
=======
    (0, typeorm_1.Column)({ type: "varchar", name: "identityCode" }),
>>>>>>> 822aca9d10b7325e68f388c3c26962881af91ccf
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Max)(20),
    __metadata("design:type", String)
], Authentication.prototype, "identityCode", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.authentication),
    __metadata("design:type", user_entity_1.User)
], Authentication.prototype, "user", void 0);
exports.Authentication = Authentication = __decorate([
    (0, typeorm_1.Entity)({ name: "authentications" }),
    __metadata("design:paramtypes", [])
], Authentication);
//# sourceMappingURL=authentication.entity.js.map
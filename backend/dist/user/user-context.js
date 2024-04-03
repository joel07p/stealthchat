"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserContext = void 0;
const common_1 = require("@nestjs/common");
let UserContext = class UserContext {
    generateIdentityCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const identityCodeLength = 10;
        let identityCode = '#';
        for (let index = 0; index < (identityCodeLength - 1); index++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            identityCode += characters[randomIndex];
        }
        this.setIdentityCode(identityCode);
        return identityCode;
    }
    setUser(user) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
    }
    getId() {
        return this.id;
    }
    getUsername() {
        return this.username;
    }
    getEmail() {
        return this.email;
    }
    getIdentityCode() {
        return this.identityCode;
    }
    setIdentityCode(value) {
        this.identityCode = value;
    }
    getAccessCode() {
        return this.accessCode;
    }
    setAccessCode(accessCode) {
        this.accessCode = accessCode;
    }
    getIsAuthenticated() {
        return this.isAuthenticated;
    }
    setIsAuthenticated(value) {
        this.isAuthenticated = value;
    }
};
exports.UserContext = UserContext;
exports.UserContext = UserContext = __decorate([
    (0, common_1.Injectable)()
], UserContext);
//# sourceMappingURL=user-context.js.map
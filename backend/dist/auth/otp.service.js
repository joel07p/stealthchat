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
exports.OTPService = void 0;
const common_1 = require("@nestjs/common");
const user_context_1 = require("../modules/user/user-context");
let OTPService = class OTPService {
    constructor(userContext) {
        this.userContext = userContext;
        this.lenght = 6;
    }
    generateOTP() {
        const accessCode = [];
        for (let index = 0; index < this.lenght; index++) {
            accessCode.push(Math.floor(Math.random() * 10));
        }
        this.userContext.setAccessCode(accessCode);
        return accessCode;
    }
    sendOTP() {
        const accessCode = this.generateOTP();
    }
    checkOTP(accessCode) {
        const isAuthenticated = this.userContext.getAccessCode() === accessCode;
        this.userContext.setIsAuthenticated(isAuthenticated);
        return isAuthenticated;
    }
};
exports.OTPService = OTPService;
exports.OTPService = OTPService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_context_1.UserContext])
], OTPService);
//# sourceMappingURL=otp.service.js.map
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
const auth_service_1 = require("./auth.service");
const mail_service_1 = require("../service/mail.service");
let OTPService = class OTPService {
    constructor(userContext, authService, mailService) {
        this.userContext = userContext;
        this.authService = authService;
        this.mailService = mailService;
        this.length = 6;
    }
    generateOTP() {
        let accessCode = '';
        for (let index = 0; index < this.length; index++) {
            accessCode += Math.floor(Math.random() * 10).toString();
        }
        this.userContext.setAccessCode(accessCode);
        return accessCode;
    }
    sendOTP() {
        const accessCode = this.generateOTP();
        common_1.Logger.log(accessCode);
    }
    verifyOTP(credentials) {
        const { username, password, otp } = credentials;
        const isAuthenticated = this.userContext.getAccessCode() === otp;
        if (!isAuthenticated)
            throw new common_1.BadRequestException("OTP is invalid");
        this.userContext.setAccessCode(null);
        this.userContext.setIsAuthenticated(isAuthenticated);
        return this.authService.signIn({ username, password });
    }
};
exports.OTPService = OTPService;
exports.OTPService = OTPService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_context_1.UserContext,
        auth_service_1.AuthService,
        mail_service_1.MailService])
], OTPService);
//# sourceMappingURL=otp.service.js.map
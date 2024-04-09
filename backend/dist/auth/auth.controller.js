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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../common/decorators");
const guards_1 = require("../common/guards");
const auth_service_1 = require("./auth.service");
const model_1 = require("./model");
const otp_service_1 = require("./otp.service");
let AuthController = class AuthController {
    constructor(authService, otpService) {
        this.authService = authService;
        this.otpService = otpService;
    }
    signIn(credentials) {
        return this.authService.signIn(credentials);
    }
    signUp(credentials) {
        return this.authService.signUp(credentials);
    }
    logout(userId) {
        return this.authService.logout(userId);
    }
    refreshTokens(userId, data) {
        return this.authService.refreshTokens(userId, data.refreshToken);
    }
    getAccessCode() {
        this.otpService.sendOTP();
    }
    verifyAccessCode(credentials) {
        return this.otpService.verifyOTP(credentials);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_1.BaseAuth]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_1.SignUpDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, decorators_1.User)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.UseGuards)(guards_1.RtGuard),
    (0, common_1.Post)('refresh'),
    __param(0, (0, decorators_1.User)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshTokens", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('otp/send'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getAccessCode", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('otp/verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_1.OTPAuth]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verifyAccessCode", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        otp_service_1.OTPService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
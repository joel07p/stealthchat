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
exports.WebsocketJWTGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const console_1 = require("console");
let WebsocketJWTGuard = class WebsocketJWTGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const socket = context.switchToWs().getClient();
        (0, console_1.log)("ws-guard");
        const token = socket.handshake.auth.authorization || socket.handshake.headers['authorization'];
        (0, console_1.log)(socket.handshake.headers);
        const formattedToken = token.split(' ')[1];
        (0, console_1.log)(formattedToken);
        try {
            const payload = this.jwtService.verify(formattedToken);
            if (payload)
                return true;
        }
        catch (error) {
            (0, console_1.log)(error);
            return false;
        }
    }
};
exports.WebsocketJWTGuard = WebsocketJWTGuard;
exports.WebsocketJWTGuard = WebsocketJWTGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], WebsocketJWTGuard);
//# sourceMappingURL=ws-jwt.guard.js.map
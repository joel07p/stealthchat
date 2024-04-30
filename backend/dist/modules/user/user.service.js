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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const authentication_entity_1 = require("../../auth/authentication.entity");
let UserService = class UserService {
    constructor(userRepository, authRepository) {
        this.userRepository = userRepository;
        this.authRepository = authRepository;
    }
    async createUser(username) {
        const auth = new authentication_entity_1.Authentication();
        auth.setHash("sui");
        this.authRepository.save(auth);
        const user = new user_entity_1.User(username, "sui9", auth);
        const savedUser = await this.userRepository.save(user);
        console.log(await this.userRepository.findOne({ where: { id: savedUser.id }, relations: ["authentication"] }));
    }
    async getUser(username) {
        return await this.userRepository.findOne({ where: { username } });
    }
    async getUserProperty(userId, property) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (property)
            return user[property];
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(authentication_entity_1.Authentication)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map
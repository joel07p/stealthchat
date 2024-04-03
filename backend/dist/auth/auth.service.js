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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../modules/user/user.entity");
const typeorm_2 = require("typeorm");
const authentication_entity_1 = require("./authentication.entity");
const user_context_1 = require("../modules/user/user-context");
let AuthService = class AuthService {
    constructor(userRepository, authenticationRepository, userContext, jwtService, configService, dataSource) {
        this.userRepository = userRepository;
        this.authenticationRepository = authenticationRepository;
        this.userContext = userContext;
        this.jwtService = jwtService;
        this.configService = configService;
        this.dataSource = dataSource;
    }
    signIn() { }
    async signUp(credentials) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const { username, email } = credentials;
            const hash = await this.hashData(credentials.password);
            const authentication = new authentication_entity_1.Authentication();
            authentication.setHash(hash);
            const user = new user_entity_1.User(username, email, authentication);
            const { refreshToken } = await this.getTokens(user.id, user.id);
            authentication.setRefreshToken(await this.hashData(refreshToken));
            await this.authenticationRepository.save(authentication);
            await this.userRepository.save(user);
            await queryRunner.commitTransaction();
            common_1.Logger.log("User successfully created");
            return user;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            common_1.Logger.error("Failed to create user");
        }
        finally {
            await queryRunner.release();
        }
    }
    logout() { }
    refreshTokens() { }
    async updateRtHash(userId, rt) {
        const hashedRt = await this.hashData(rt);
        const { authentication } = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: ['Authentication']
        });
        authentication.setRefreshToken(hashedRt);
        await this.authenticationRepository.save(authentication);
    }
    async getTokens(userId, username) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                username
            }, {
                secret: this.configService.get('JWT_AT_SECRET'),
                expiresIn: 60 * 60 * 2
            }),
            this.jwtService.signAsync({
                sub: userId,
                username
            }, {
                secret: this.configService.get('JWT_RT_SECRET'),
                expiresIn: 60 * 60 * 24
            })
        ]);
        return {
            accessToken,
            refreshToken
        };
    }
    hashData(password) {
        return bcrypt.hash(password, 10);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(authentication_entity_1.Authentication)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        user_context_1.UserContext,
        jwt_1.JwtService,
        config_1.ConfigService,
        typeorm_2.DataSource])
], AuthService);
//# sourceMappingURL=auth.service.js.map
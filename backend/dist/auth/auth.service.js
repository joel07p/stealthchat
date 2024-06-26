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
const user_context_1 = require("../modules/user/user-context");
const user_entity_1 = require("../modules/user/user.entity");
const typeorm_2 = require("typeorm");
const authentication_entity_1 = require("./authentication.entity");
const console_1 = require("console");
const user_service_1 = require("../modules/user/user.service");
let AuthService = class AuthService {
    constructor(userRepository, authenticationRepository, userContext, jwtService, configService, dataSource, userService) {
        this.userRepository = userRepository;
        this.authenticationRepository = authenticationRepository;
        this.userContext = userContext;
        this.jwtService = jwtService;
        this.configService = configService;
        this.dataSource = dataSource;
        this.userService = userService;
    }
    async signIn(credentials) {
        const { username, password } = credentials;
        const user = await this.userRepository.findOne({
            where: {
                username
            },
            relations: ['authentication']
        });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        const passwordMatches = await bcrypt.compare(password, user.authentication.getHash());
        if (!passwordMatches)
            throw new common_1.ForbiddenException("Password does not match");
        const tokens = await this.getTokens(user.id, user.username);
        await this.updateRtHash(user.id, tokens.refreshToken);
        this.userContext.setUser(user);
        return tokens;
    }
    async signUp(credentials) {
        let userCreated = false;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const { username, email } = credentials;
            const hash = await this.hashData(credentials.password);
            const authentication = new authentication_entity_1.Authentication();
            authentication.setIdentityCode(this.userContext.generateIdentityCode());
            authentication.setHash(hash);
            const user = new user_entity_1.User(username, email, authentication);
            const { refreshToken } = await this.getTokens(user.id, user.id);
            authentication.setRefreshToken(await this.hashData(refreshToken));
            await this.authenticationRepository.save(authentication);
            await this.userRepository.save(user);
            await queryRunner.commitTransaction();
            common_1.Logger.log("User successfully created");
            userCreated = true;
            return user;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            common_1.Logger.error(error);
            common_1.Logger.log(error);
        }
        finally {
            await queryRunner.release();
        }
        return userCreated;
    }
    async logout(userId) {
        const { authentication } = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: ['authentication']
        });
        authentication.setRefreshToken(null);
        await this.authenticationRepository.save(authentication);
        common_1.Logger.log("User logged out");
    }
    async refreshTokens(userId, rt) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: ['authentication']
        });
        if (!user || !user.authentication.getRefreshToken())
            throw new common_1.NotFoundException("User not found");
        const rtMatches = await bcrypt.compare(rt, user.authentication.getRefreshToken());
        if (!rtMatches)
            throw new common_1.ForbiddenException("Access denied");
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refreshToken);
        return tokens;
    }
    async updateRtHash(userId, rt) {
        const hashedRt = await this.hashData(rt);
        const { authentication } = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: ['authentication']
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
    async verifyToken(token) {
        try {
            (0, console_1.log)("validate ws token");
            const payload = this.jwtService.decode(token);
            (0, console_1.log)(payload);
            const user = await this.userService.getUserProperty(payload.sub, null);
            return user.id;
        }
        catch (error) {
            (0, console_1.log)("Invalid token");
            return null;
        }
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
        typeorm_2.DataSource,
        user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
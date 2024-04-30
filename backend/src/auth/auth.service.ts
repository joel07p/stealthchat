import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserContext } from 'src/modules/user/user-context';
import { User } from 'src/modules/user/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Authentication } from './authentication.entity';
import { BaseAuth, SignUpDTO } from './model';
import { Tokens } from './types';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Authentication) private authenticationRepository: Repository<Authentication>,
        private userContext: UserContext,
        private jwtService: JwtService,
        private configService: ConfigService,
        private dataSource: DataSource
    ) {}

    async signIn(credentials: BaseAuth) {
        const { username, password } = credentials

        const user = await this.userRepository.findOne({
            where: {
                username
            },
            relations: ['authentication']
        })

        if(!user) throw new NotFoundException("User not found")

        const passwordMatches = await bcrypt.compare(password, user.authentication.getHash())

        if(!passwordMatches) throw new ForbiddenException("Password does not match")

        const tokens = await this.getTokens(user.id, user.email)
        await this.updateRtHash(user.id, tokens.refreshToken)
        this.userContext.setUser(user)
        return tokens
    }

    async signUp(credentials: SignUpDTO) {
        let userCreated = false
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect();
        await queryRunner.startTransaction()

        try {
            const { username, email } = credentials
            const hash = await this.hashData(credentials.password)
            
            const authentication = new Authentication()
            authentication.setIdentityCode(this.userContext.generateIdentityCode())
            authentication.setHash(hash)
            
            const user = new User(username, email, authentication);

            const { refreshToken } = await this.getTokens(user.id, user.id)
            authentication.setRefreshToken(await this.hashData(refreshToken))

            await this.authenticationRepository.save(authentication)
            await this.userRepository.save(user)

            await queryRunner.commitTransaction()

            Logger.log("User successfully created")
            userCreated = true

            return user;
        } catch (error) {
            await queryRunner.rollbackTransaction()
            Logger.error(error)
            Logger.log(error)
        } finally {
            await queryRunner.release();
        }

        return userCreated
    }
    
    async logout(userId: string) {
        const { authentication } = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: ['authentication']
        })

        authentication.setRefreshToken(null)

        await this.authenticationRepository.save(authentication)

        Logger.log("User logged out")
    }
    
    async refreshTokens(userId: string, rt: string) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: ['authentication']
        })

        if(!user || !user.authentication.getRefreshToken()) throw new NotFoundException("User not found")

        const rtMatches = await bcrypt.compare(rt, user.authentication.getRefreshToken())
        if(!rtMatches) throw new ForbiddenException("Access denied")

        const tokens = await this.getTokens(user.id, user.email)
        await this.updateRtHash(user.id, tokens.refreshToken)
        return tokens
    }

    async updateRtHash(userId: string, rt: string) {
        const hashedRt = await this.hashData(rt)
        const { authentication } = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: ['authentication']
        })

        authentication.setRefreshToken(hashedRt)

        await this.authenticationRepository.save(authentication)
    }

    async getTokens(userId: string, username: string): Promise<Tokens> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username
                },
                {
                    secret: this.configService.get<string>('JWT_AT_SECRET'),
                    expiresIn: 60 * 60 * 2 //in seconds -> 1hr
                }
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username
                },
                {
                    secret: this.configService.get<string>('JWT_RT_SECRET'),
                    expiresIn: 60 * 60 * 24
                }
            )
        ])

        return {
            accessToken,
            refreshToken
        }
    }

    hashData(password: string) {
        return bcrypt.hash(password, 10)
    }
}
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/user/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Authentication } from './authentication.entity';
import { SignUpDTO } from './model';
import { Tokens } from './types';
import { UserContext } from 'src/modules/user/user-context';

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

    signIn() {}

    async signUp(credentials: SignUpDTO) {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect();
        await queryRunner.startTransaction()

        try {
            const { username, email } = credentials
            const hash = await this.hashData(credentials.password)
            
            const authentication = new Authentication()
            authentication.setHash(hash)
            
            const user = new User(username, email, authentication);

            const { refreshToken } = await this.getTokens(user.id, user.id)
            authentication.setRefreshToken(await this.hashData(refreshToken))

            await this.authenticationRepository.save(authentication)
            await this.userRepository.save(user)

            await queryRunner.commitTransaction()

            Logger.log("User successfully created")

            return user;
        } catch (error) {
            await queryRunner.rollbackTransaction()
            Logger.error("Failed to create user")
        } finally {
            await queryRunner.release();
        }
    }
    
    logout() {}
    
    refreshTokens() {}

    async updateRtHash(userId: string, rt: string) {
        const hashedRt = await this.hashData(rt)
        const { authentication } = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: ['Authentication']
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
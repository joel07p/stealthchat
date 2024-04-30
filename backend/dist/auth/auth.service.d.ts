import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserContext } from 'src/modules/user/user-context';
import { User } from 'src/modules/user/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Authentication } from './authentication.entity';
import { BaseAuth, SignUpDTO } from './model';
import { Tokens } from './types';
export declare class AuthService {
    private userRepository;
    private authenticationRepository;
    private userContext;
    private jwtService;
    private configService;
    private dataSource;
    constructor(userRepository: Repository<User>, authenticationRepository: Repository<Authentication>, userContext: UserContext, jwtService: JwtService, configService: ConfigService, dataSource: DataSource);
    signIn(credentials: BaseAuth): Promise<Tokens>;
    signUp(credentials: SignUpDTO): Promise<boolean | User>;
    logout(userId: string): Promise<void>;
    refreshTokens(userId: string, rt: string): Promise<Tokens>;
    updateRtHash(userId: string, rt: string): Promise<void>;
    getTokens(userId: string, username: string): Promise<Tokens>;
    hashData(password: string): Promise<string>;
}

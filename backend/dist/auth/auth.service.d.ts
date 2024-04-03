import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Authentication } from './authentication.entity';
import { SignUpDTO } from './model';
import { Tokens } from './types';
export declare class AuthService {
    private userRepository;
    private authenticationRepository;
    private jwtService;
    private configService;
    private dataSource;
    constructor(userRepository: Repository<User>, authenticationRepository: Repository<Authentication>, jwtService: JwtService, configService: ConfigService, dataSource: DataSource);
    signIn(): void;
    signUp(credentials: SignUpDTO): Promise<User>;
    logout(): void;
    refreshTokens(): void;
    getTokens(userId: string, username: string): Promise<Tokens>;
    hashData(password: string): Promise<string>;
}

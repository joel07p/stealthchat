<<<<<<< HEAD
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Authentication } from './authentication.entity';
import { SignUpDTO } from './model';
import { Tokens } from './types';
import { UserContext } from 'src/modules/user/user-context';
export declare class AuthService {
    private userRepository;
    private authenticationRepository;
    private userContext;
    private jwtService;
    private configService;
    private dataSource;
    constructor(userRepository: Repository<User>, authenticationRepository: Repository<Authentication>, userContext: UserContext, jwtService: JwtService, configService: ConfigService, dataSource: DataSource);
    signIn(): void;
    signUp(credentials: SignUpDTO): Promise<User>;
    logout(): void;
    refreshTokens(): void;
    updateRtHash(userId: string, rt: string): Promise<void>;
    getTokens(userId: string, username: string): Promise<Tokens>;
    hashData(password: string): Promise<string>;
=======
export declare class AuthService {
>>>>>>> 822aca9d10b7325e68f388c3c26962881af91ccf
}

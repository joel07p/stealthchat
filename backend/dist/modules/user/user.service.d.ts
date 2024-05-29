import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Authentication } from 'src/auth/authentication.entity';
export declare class UserService {
    private userRepository;
    private authRepository;
    constructor(userRepository: Repository<User>, authRepository: Repository<Authentication>);
    createUser(username: string): Promise<void>;
    getUser(username: string): Promise<User>;
    getUserProperty(userId: string, property: string | undefined | null): Promise<any>;
}

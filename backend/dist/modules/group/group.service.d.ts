import { Authentication } from 'src/auth/authentication.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateGroupDTO, JoinGroupDTO, LeaveGroupDTO } from './group.dto';
import { Group } from './group.entity';
import { UserOnGroups } from './user-on-group.entity';
import { UserService } from '../user/user.service';
export declare class GroupService {
    private groupRepository;
    private userRepository;
    private userOnGroupsRepository;
    private authenticationRepository;
    private readonly userService;
    constructor(groupRepository: Repository<Group>, userRepository: Repository<User>, userOnGroupsRepository: Repository<UserOnGroups>, authenticationRepository: Repository<Authentication>, userService: UserService);
    getGroups(user: any): Promise<{
        id: string;
        name: string;
        type: string;
        role: string;
        users: number;
        rooms: number;
    }[]>;
    createGroup(userId: string, data: CreateGroupDTO): Promise<{
        id: string;
        name: string;
        type: string;
        role: string;
        users: number;
        rooms: number;
    }>;
    joinGroup(userId: string, data: JoinGroupDTO): Promise<{
        id: string;
        name: string;
        type: string;
        role: string;
        users: number;
        rooms: number;
    }>;
    leaveGroup(userId: string, data: LeaveGroupDTO): Promise<UserOnGroups>;
    getUserRole(userId: string, groupId: string): Promise<string>;
    private getUser;
    private generateJoinCode;
}

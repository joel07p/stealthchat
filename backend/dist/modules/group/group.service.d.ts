import { Authentication } from 'src/auth/authentication.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateGroupDTO, JoinGroupDTO, LeaveGroupDTO } from './group.dto';
import { Group } from './group.entity';
import { UserOnGroups } from './user-on-group.entity';
export declare class GroupService {
    private groupRepository;
    private userRepository;
    private userOnGroupsRepository;
    private authenticationRepository;
    constructor(groupRepository: Repository<Group>, userRepository: Repository<User>, userOnGroupsRepository: Repository<UserOnGroups>, authenticationRepository: Repository<Authentication>);
    getGroups(): Promise<void>;
    createGroup(data: CreateGroupDTO): Promise<void>;
    joinGroup(user: any, data: JoinGroupDTO): Promise<void>;
    leaveGroup(user: any, data: LeaveGroupDTO): Promise<void>;
}

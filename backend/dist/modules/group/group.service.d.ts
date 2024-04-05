import { Authentication } from 'src/auth/authentication.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateGroupDTO } from './group.dto';
import { Group } from './group.entity';
import { UserOnGroups } from './user-on-group.entity';
export declare class GroupService {
    private groupRepository;
    private userRepository;
    private userOnGroupsRepository;
    private authenticationRepository;
    constructor(groupRepository: Repository<Group>, userRepository: Repository<User>, userOnGroupsRepository: Repository<UserOnGroups>, authenticationRepository: Repository<Authentication>);
    createGroup(data: CreateGroupDTO): Promise<void>;
}

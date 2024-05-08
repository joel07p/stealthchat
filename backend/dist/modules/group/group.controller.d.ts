import { CreateGroupDTO, JoinGroupDTO, LeaveGroupDTO } from './group.dto';
import { GroupService } from './group.service';
export declare class GroupController {
    private groupService;
    constructor(groupService: GroupService);
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
    leaveGroup(userId: string, data: LeaveGroupDTO): Promise<import("src/modules/group/user-on-group.entity").UserOnGroups>;
}

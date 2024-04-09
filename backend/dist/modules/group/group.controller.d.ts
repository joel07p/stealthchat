import { CreateGroupDTO } from './group.dto';
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
    createGroup(user: any, data: CreateGroupDTO): Promise<{
        id: string;
        name: string;
        type: string;
        role: string;
        users: number;
        rooms: number;
    }>;
}

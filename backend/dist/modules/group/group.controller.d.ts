import { CreateGroupDTO } from './group.dto';
import { GroupService } from './group.service';
export declare class GroupController {
    private groupService;
    constructor(groupService: GroupService);
    createGroup(user: any, data: CreateGroupDTO): Promise<void>;
}

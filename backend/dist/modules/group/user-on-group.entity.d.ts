import { Group } from './group.entity';
import { User } from '../user/user.entity';
export declare class UserOnGroups {
    id: number;
    user: User;
    group: Group;
    role: string;
}

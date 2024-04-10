import { Message } from "../message/message.entity";
import { Permission } from "../permission/permission.entity";
import { Group } from "../group/group.entity";
export declare class Room {
    constructor(name: string);
    readonly id: string;
    name: string;
    messages: Array<Message>;
    permissions: Array<Permission>;
    group: Group;
}

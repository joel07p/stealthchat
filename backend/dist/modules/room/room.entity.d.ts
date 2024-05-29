import { Group } from "../group/group.entity";
import { Message } from "../message/message.entity";
import { Permission } from "../permission/permission.entity";
export declare class Room {
    constructor(name: string);
    readonly id: string;
    name: string;
    messages: Array<Message>;
    permissions: Array<Permission>;
    group: Group;
}

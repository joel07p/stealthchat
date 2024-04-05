import { Invitation } from "../invitation/invitation.entity";
import { Room } from "../room/room.entity";
import { UserOnGroups } from "./user-on-group.entity";
export declare class Group {
    constructor(name: string, description: string, type: string);
    readonly id: string;
    name: string;
    description: string;
    type: string;
    joinCode: string;
    createdAt: Date;
    rooms: Array<Room>;
    invitations: Array<Invitation>;
    userOnGroups: Array<UserOnGroups>;
}

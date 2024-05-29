import { Room } from "../room/room.entity";
export declare class Permission {
    constructor(name: string);
    readonly id: string;
    name: string;
    rooms: Array<Room>;
}

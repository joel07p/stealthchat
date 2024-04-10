import { Room } from "../room/room.entity";
export declare class Message {
    constructor(message: string, username: string, content?: any);
    readonly id: string;
    message: string;
    content: any;
    username: string;
    sentAt: Date;
    room: Room;
}

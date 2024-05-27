import { Attachment } from "../file/attachment.entity";
import { Room } from "../room/room.entity";
export declare class Message {
    constructor(message: string, username: string, attachment?: Attachment);
    readonly id: string;
    message: string;
    username: string;
    sentAt: Date;
    room: Room;
}

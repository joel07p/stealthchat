import { CreateRoomDTO } from './dtos';
import { RoomService } from './room.service';
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomService);
    getRoom(roomId: string): Promise<import("src/modules/room/room.entity").Room>;
    getRooms(userId: string, groupId: string): Promise<import("src/modules/room/room.entity").Room[]>;
    createRoom(userId: string, data: CreateRoomDTO): Promise<import("src/modules/room/room.entity").Room>;
}

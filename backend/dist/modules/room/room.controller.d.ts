import { RoomService } from './room.service';
import { CreateRoomDTO } from './dtos';
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomService);
    createRoom(data: CreateRoomDTO): Promise<import("src/modules/room/room.entity").Room>;
}

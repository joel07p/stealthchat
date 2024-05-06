import { Body, Controller, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDTO } from './dtos';

@Controller('room')
export class RoomController {
    constructor(
        private readonly roomService: RoomService
    ) {}
    
    @Post()
    createRoom(@Body() data: CreateRoomDTO) {
        return this.roomService.createRoom(data)
    }
}

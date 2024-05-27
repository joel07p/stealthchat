import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/common/decorators';
import { CreateRoomDTO } from './dtos';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
    constructor(
        private readonly roomService: RoomService
    ) {}

    @Get(':groupId')
    getRooms(@User("sub") userId: string, @Param('groupId') groupId: string) {
        return this.roomService.getRooms({ groupId, userId })
    }

    @Post('/create')
    async createRoom(@User("sub") userId: string, @Body() data: CreateRoomDTO) {
        const room = await this.roomService.createRoom(data)
        if(await this.roomService.checkIfUserHasPermission(userId, room)) {
            return room
        }
    }
}

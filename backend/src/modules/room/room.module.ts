import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { PermissionService } from './permission.service';

@Module({
  providers: [RoomService, PermissionService],
  controllers: [RoomController]
})
export class RoomModule {}

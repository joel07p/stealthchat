import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '../group/group.entity';
import { Permission } from '../permission/permission.entity';
import { RoomController } from './room.controller';
import { Room } from './room.entity';
import { RoomService } from './room.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Permission, Group])
  ],
  providers: [
    RoomService,
  ],
  controllers: [RoomController]
})
export class RoomModule {}

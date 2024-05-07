import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '../group/group.entity';
import { Permission } from '../permission/permission.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { RoomController } from './room.controller';
import { Room } from './room.entity';
import { RoomService } from './room.service';
import { Authentication } from 'src/auth/authentication.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Permission, Group, User, Authentication]),
  ],
  providers: [
    RoomService,
    UserService
  ],
  controllers: [RoomController]
})
export class RoomModule {}

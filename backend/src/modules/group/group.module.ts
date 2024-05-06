import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { UserOnGroups } from './user-on-group.entity';
import { Authentication } from 'src/auth/authentication.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Authentication, Group, UserOnGroups])],
  providers: [GroupService],
  controllers: [GroupController],
  exports: [GroupService]
})
export class GroupModule {}

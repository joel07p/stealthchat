import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { User } from 'src/common/decorators';
import { CreateGroupDTO, JoinGroupDTO, LeaveGroupDTO } from './group.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
    constructor(
        private groupService: GroupService
    ) {}

    @Get()
    getGroups(@User() user: any) {
        return this.groupService.getGroups(user)
    }

    @Post()
    createGroup(@User('sub') userId: string, @Body() data: CreateGroupDTO) {
        return this.groupService.createGroup(userId, data)
    }

    @Post("join")
    joinGroup(@User('sub') userId: string, @Body() data: JoinGroupDTO) {
        return this.groupService.joinGroup(userId, data)
    }

    @Patch()
    leaveGroup(@User('sub') userId: string, @Body() data: LeaveGroupDTO) {
        return this.groupService.leaveGroup(userId, data)
    }
}

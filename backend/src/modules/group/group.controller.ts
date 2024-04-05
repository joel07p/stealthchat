import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/common/decorators';
import { CreateGroupDTO } from './group.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
    constructor(
        private groupService: GroupService
    ) {
        
    }

    @Post()
    createGroup(@User() user: any, @Body() data: CreateGroupDTO) {
        return this.groupService.createGroup(data)
    }
}

import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/common/decorators';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('current/base')
    getUserId(@User('sub') userId: string, @User('username') username: string) {
        return {userId, username}
    }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './modules/user/user.service';
import { log } from 'console';

@Controller()
export class AppController {
  constructor(public userService: UserService) {}

  @Get()
  test(): string {
    return "Connection"
  }

  @Post("test/user")
  testUser(@Body() username): void {
    this.userService.createUser(username.username)
  }
}

import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './modules/user/user.service';

@Controller()
export class AppController {
  constructor(public userService: UserService) {}

  @Get()
  test(): string {
    return "Connection"
  }

  @Post("test/user")
  testUser(@Body() username): void {
    console.log(username)
    throw new ConflictException()
    //this.userService.createUser(username.username)
  }
}

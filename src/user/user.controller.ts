// standard libraries
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
// internal libraries
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * get all users from the database
   * @returns the list of users
   */
  @Get('')
  async getUsers(): Promise<User[]> {
    const users = this.userService.getUsers();
    return users;
  }
  @Post('create-user')
  async CreateUserDto(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}

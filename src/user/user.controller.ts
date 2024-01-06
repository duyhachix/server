// standard libraries
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
// internal libraries
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

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

  /**
   * create a new user
   * @param createUserDto
   * @returns a new user details
   */
  @Post('create-user')
  async CreateUserDto(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  /**
   * Updates a user details
   * @param id: user id
   * @param updateUserDto
   */
  @Put(':id')
  async updateUserById(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

  /**
   * Delete a user from the database
   * @param id : user id
   */
  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    this.userService.deleteUser(id);
  }

  @Get(':params')
  findUserByParams(@Param('params') params: string) {
    return this.userService.findUserByParams(params);
  }
}

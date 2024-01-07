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
    const users = await this.userService.getUsers();
    return users;
  }

  /**
   * create a new user
   * @param createUserDto
   * @returns a new user details
   */
  @Post('sign-up')
  async CreateUserDto(@Body() createUserDto: CreateUserDto) {
    const content = await this.userService.createUser(createUserDto);

    return {
      message: `User ${content.email} created successfully`,
      content,
    };
  }

  /**
   * Updates a user details
   * @param id: user id
   * @param updateUserDto
   * @returns status message and updated details
   */
  @Put(':id')
  async updateUserById(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const content = await this.userService.updateUser(id, updateUserDto);
    if (!content) {
      return {
        message: 'User not found or no changes applied',
      };
    }
    return {
      message: 'User updated successfully',
      content,
    };
  }

  /**
   * Delete a user from the database
   * @param id : user id
   * @returns : status message
   */
  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }

  @Get(':params')
  async findUserByParams(@Param('params') params: string) {
    return await this.userService.findUserByParams(params);
  }

  /**
   * Login a user
   * @param loginInfo: user email and password
   * @returns user details
   */
  @Post('login')
  async login(@Body() loginInfo: { email: string; password: string }) {
    const content = await this.userService.findUserByEmailAndPassword(
      loginInfo.email,
      loginInfo.password,
    );

    if (!content) {
      return {
        message: 'User not found',
      };
    }
    return {
      message: 'Login successful',
      content,
    };
  }
}

// standard libraries
import { Controller, Get } from '@nestjs/common';
// internal libraries
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * get all users from the database
   * @returns the list of users
   */
  @Get('')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}

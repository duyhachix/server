import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserParams, UpdateUserParams } from '../utils/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * create new user api
   * @param userDetails : new user details
   * @returns response
   */
  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
    });
    return this.userRepository.save(newUser);
  }
  // async findOne(username: string): Promise<User | undefined> {
  //   return this.userRepository.findOne({ username });
  // }
  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }
  deleteUser(id: number) {
    this.userRepository.delete({ id });
    return { message: 'User deleted successfully' };
  }
  findUserByParams(params: string) {
    // return a user with email
    return this.userRepository.findOne({
      where: { email: params },
    });
  }
}

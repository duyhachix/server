import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserParams } from '../utils/types';

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
}

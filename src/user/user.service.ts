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

  /**
   * update new details
   * @param id: user id
   * @param updateUserDetails: new user details
   * @returns: status message
   */
  async updateUser(id: number, updateUserDetails: UpdateUserParams) {
    // return this.userRepository.update({ id }, { ...updateUserDetails });
    try {
      const result = await this.userRepository.update(
        { id },
        { ...updateUserDetails },
      );
      console.log('update result', result);
      if (result.affected === 0) {
        throw new Error('User not found or no changes applied');
      }

      return { message: 'User updated successfully' };
    } catch (error) {
      console.error('Error updating user:', error.message);
      throw error;
    }
  }

  /**
   * Delete a user from the database
   * @param id : user id
   * @returns : status message
   */
  async deleteUser(id: number) {
    try {
      const result = await this.userRepository.delete({ id });
      console.log('delete result', result);
      if (!result) {
        throw new Error('User not found');
      }

      return { message: 'User deleted successfully' };
    } catch (error) {
      console.error('Error deleting user:', error.message);
      throw error;
    }
  }

  async findUserByParams(params: string) {
    // return a user with email
    try {
      const user = await this.userRepository.findOne({
        where: { email: params },
      });
      if (!user) {
        throw new Error('User not found'); // Hoặc bạn có thể sử dụng một loại exception khác phù hợp với ứng dụng của bạn
      }

      return user;
    } catch (error) {
      console.error('Error finding user by params:', error.message);
      throw error;
    }
  }
}

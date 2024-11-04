import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserResponse } from './interfaces';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {

    try {
      const user = {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10)
      }
      await this.userRepository.create(user)

      const userCreated = await this.userRepository.save(user);

      return {
        email: userCreated.email,
        username: userCreated.username,
        message: "User created successfully"
      }
    } catch (error) {
      throw new HttpException(error.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(): Promise<UserResponse[]> {

    try {
      const users = await this.userRepository.find();

      return users.map((user) => ({
        email: user.email,
        username: user.username
      }))

    } catch (error) {
      throw new HttpException("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async findOne(email: string): Promise<UserResponse> {

    try {
      const user = await this.userRepository.findOneBy({ email })

      if (!user) {
        throw new HttpException("USER_NOT_FOUND", HttpStatus.NOT_FOUND)
      }

      return {
        email: user.email,
        username: user.username,
        password: user.password
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }

      throw new HttpException("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async update(email: string, updateUserDto: UpdateUserDto): Promise<UserResponse> {
    try {
      const user = await this.userRepository.findOneBy({ email });
  
      if (!user) {
        throw new HttpException("USER_NOT_FOUND", HttpStatus.NOT_FOUND);
      }
  
      const updatedUser = await this.userRepository.save({
        ...user,             
        ...updateUserDto, 
      });
  
      return {
        email: updatedUser.email,
        username: updatedUser.username,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(email: string): Promise<UserResponse> {
    try {

      const user = await this.userRepository.findOneBy({ email });
  
      if (!user) {
        throw new HttpException("USER_NOT_FOUND", HttpStatus.NOT_FOUND);
      }
  
      await this.userRepository.delete({ email });
  
      return {
        email: user.email,
        username: user.username,
        message: "User deleted successfully"
      }
    } catch (error) {
      
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './interfaces';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserResponse[]> {
    return await this.usersService.findAll();
  }

  @Get(':email')
  async findOne(@Param('email') email: string): Promise<UserResponse> {
    const user = await this.usersService.findOne(email);

    return { ...user, password: undefined }
  }

  @Patch(':email')
  async update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto): Promise<UserResponse> {
    return this.usersService.update(email, updateUserDto);
  }

  @Delete(':email')
  async remove(@Param('email') email: string): Promise<UserResponse> {
    return this.usersService.remove(email);
  }
}

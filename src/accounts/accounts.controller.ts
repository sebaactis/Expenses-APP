import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountResponse } from './interfaces';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) { }

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto): Promise<AccountResponse> {
    return await this.accountsService.create(createAccountDto);
  }

  @Get()
  async findAll(): Promise<AccountResponse[]> {
    return await this.accountsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AccountResponse> {
    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto): Promise<AccountResponse> {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ accountId: number, message: string }> {
    return this.accountsService.remove(+id);
  }
}

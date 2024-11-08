import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountResponse } from './interfaces';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createAccountDto: CreateAccountDto): Promise<AccountResponse> {
    return await this.accountsService.create(createAccountDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<AccountResponse[]> {
    return await this.accountsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AccountResponse> {
    return this.accountsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto): Promise<AccountResponse> {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{accountId: number, message: string}> {
    return this.accountsService.remove(+id);
  }
}

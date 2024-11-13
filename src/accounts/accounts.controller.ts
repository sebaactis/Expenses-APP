import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
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
  async findAll(@Req() req): Promise<AccountResponse[]> {
    const userId = req.user.id;
    return await this.accountsService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string): Promise<AccountResponse> {
    const userId = req.user.id;
    return this.accountsService.findOne(+id, userId);
  }

  @Patch(':id')
  async update(@Req() req, @Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto): Promise<AccountResponse> {
    const userId = req.user.id;
    return this.accountsService.update(+id, updateAccountDto, userId);
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string): Promise<{ accountId: number, message: string }> {
    const userId = req.user.id;
    return this.accountsService.remove(+id, userId);
  }
}

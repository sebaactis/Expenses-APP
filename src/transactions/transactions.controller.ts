import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionResponse } from './interfaces';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto): Promise<TransactionResponse> {
    return await this.transactionsService.create(createTransactionDto);
  }

  @Get()
  async findAll(@Req() req): Promise<TransactionResponse> {
    const userId = req.user.id
    return await this.transactionsService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string): Promise<TransactionResponse> {
    const userId = req.user.id;
    return await this.transactionsService.findOne(+id, userId);
  }

  @Patch(':id')
  async update(@Req() req, @Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto): Promise<TransactionResponse> {
    const userId = req.user.id;
    return await this.transactionsService.update(+id, updateTransactionDto, userId);
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string): Promise<TransactionResponse> {
    const userId = req.user.id;
    return await this.transactionsService.remove(+id, userId);
  }
}

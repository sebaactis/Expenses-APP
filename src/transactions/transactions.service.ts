import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {

  constructor(@InjectRepository(Transaction) private transactionRepository: Repository<Transaction>) { }

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const transaction = await this.transactionRepository.create(createTransactionDto);

      return await this.transactionRepository.save(transaction);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll() {
    return await this.transactionRepository.find();
  }

  async findOne(id: number) {
    try {
      const transaction = await this.transactionRepository.findOne({
        where: { id },
        relations: ['category']
      })

      if (!transaction) throw new HttpException('TRANSACTION_NOT_FOUND', HttpStatus.NOT_FOUND)

      return transaction;
    } catch (error) {

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }
  

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  async remove(id: number) {
    try {
      const transaction = await this.transactionRepository.findOne({
        where: { id }
      })

      if (!transaction) throw new HttpException('TRANSACTION_NOT_FOUND', HttpStatus.NOT_FOUND)

      return await this.transactionRepository.remove(transaction);

    } catch (error) {

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR)

    }

  }
}

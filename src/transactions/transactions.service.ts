import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionResponse } from './interfaces';

@Injectable()
export class TransactionsService {

  constructor(@InjectRepository(Transaction) private transactionRepository: Repository<Transaction>) { }

  async create(createTransactionDto: CreateTransactionDto): Promise<TransactionResponse> {
    try {
      const transaction = await this.transactionRepository.create(createTransactionDto);

      await this.transactionRepository.save(transaction);

      return {
        transactions: [transaction],
        message: "TRANSACTION_CREATED",
        status: HttpStatus.CREATED
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(userId: number): Promise<TransactionResponse> {
    try {
      const transactions = await this.transactionRepository.find({
        where: { userId }
      });

      if (transactions.length < 1) {
        throw new HttpException('TRANSACTIONS_NOT_FOUND', HttpStatus.NOT_FOUND);
      }

      return {
        transactions,
        message: 'TRANSACTIONS_FOUND',
        status: HttpStatus.OK
      }
    } catch (error) {

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }

  async findOne(id: number, userId: number): Promise<TransactionResponse> {
    try {
      const transaction = await this.transactionRepository.findOne({
        where: { id, userId },
        relations: ['category']
      })

      if (!transaction) throw new HttpException('TRANSACTION_NOT_FOUND', HttpStatus.NOT_FOUND)

      return {
        transactions: [transaction],
        message: 'TRANSACTION_FOUND',
        status: HttpStatus.OK
      }
    } catch (error) {

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }


  async update(id: number, updateTransactionDto: UpdateTransactionDto, userId: number): Promise<TransactionResponse> {
    try {

      const transaction = await this.transactionRepository.findOne({
        where: { id, userId }
      })

      if (!transaction) throw new HttpException('TRANSACTION_NOT_FOUND', HttpStatus.NOT_FOUND)

      const updatedTransaction = {
        ...transaction,
        ...updateTransactionDto
      }

      await this.transactionRepository.save(updatedTransaction);

      return {
        transactions: [updatedTransaction],
        message: "TRANSACTION_UPDATED",
        status: HttpStatus.OK
      }

    } catch (error) {

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }

  async remove(id: number, userId: number): Promise<TransactionResponse> {
    try {
      const transaction = await this.transactionRepository.findOne({
        where: { id, userId }
      })

      if (!transaction) throw new HttpException('TRANSACTION_NOT_FOUND', HttpStatus.NOT_FOUND)

      const transactionRemoved = await this.transactionRepository.remove(transaction);

      return {
        transactions: [transactionRemoved],
        message: "TRANSACTION_REMOVED",
        status: HttpStatus.OK
      }

    } catch (error) {

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { AccountResponse } from './interfaces';

@Injectable()
export class AccountsService {

  constructor(@InjectRepository(Account) private accountRepository: Repository<Account>) { }

  async create(createAccountDto: CreateAccountDto): Promise<AccountResponse> {
    try {
      const account = await this.accountRepository.create(createAccountDto);

      await this.accountRepository.save(account);
      return account;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(userId: number): Promise<AccountResponse[]> {
    try {
      const accounts = await this.accountRepository.find({
        where: { userId },
        relations: ['user']
      });

      return accounts.map(account => ({
        ...account,
        user: {
          ...account.user,
          password: undefined
        }
      }))

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number, userId: number): Promise<AccountResponse> {

    try {
      const account = await this.accountRepository.findOne({
        where: { id, userId },
        relations: ['user']
      })

      if (!account) {
        throw new HttpException("ACCOUNT_NOT_FOUND", HttpStatus.NOT_FOUND)
      }

      return {
        ...account,
        user: {
          ...account.user,
          password: undefined
        }
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }

      throw new HttpException("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async update(id: number, updateAccountDto: UpdateAccountDto, userId: number): Promise<AccountResponse> {

    try {

      const account = await this.accountRepository.findOne({
        where: { id, userId }
      })

      if (!account) {
        throw new HttpException("ACCOUNT_NOT_FOUND", HttpStatus.NOT_FOUND)
      }

      const updateAccount = await this.accountRepository.save({
        ...account,
        ...updateAccountDto
      })

      return updateAccount;

    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }

      throw new HttpException("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number, userId: number): Promise<{ accountId: number, message: string }> {

    try {
      const account = await this.accountRepository.findOne({
        where: { id, userId }
      })

      if (!account) {
        throw new HttpException("ACCOUNT_NOT_FOUND", HttpStatus.NOT_FOUND)
      }

      const accountDeleted = await this.accountRepository.delete({ id })

      return {
        accountId: account.id,
        message: "Account deleted successfully"
      }

    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }

      throw new HttpException("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

import { Transaction } from "./entities/transaction.entity";

export interface TransactionResponse {
    transactions: Transaction[];
    message: string;
    status: number;
}
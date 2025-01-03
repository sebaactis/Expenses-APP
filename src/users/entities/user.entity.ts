import { Account } from "src/accounts/entities/account.entity";
import { Category } from "src/categories/entities/category.entity";
import { Transaction } from "src/transactions/entities/transaction.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    country?: string;

    @Column({ nullable: true, default: "ARS" })
    preferCurrency?: string;

    @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
    spendingLimit?: number;

    @OneToMany(() => Account, (account) => account.user)
    accounts: Account[];

    @OneToMany(() => Category, (category) => category.user)
    categories: Category[];

    @OneToMany(() => Transaction, (transaction) => transaction.user)
    transactions: Transaction[];
}

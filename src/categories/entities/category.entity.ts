import { Transaction } from "src/transactions/entities/transaction.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column({ unique: true })
    name: string;

    @ManyToOne(() => User, (user) => user.categories, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => Transaction, (transaction) => transaction.category, { onDelete: 'CASCADE' })
    transactions: Transaction[];
}

import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    userId: number;

    @Column()
    categoryId: number;

    @Column()
    description: string;

    @Column()
    date: Date;

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
    amount: number;

    @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Category, (category) => category.transactions, { onDelete: 'CASCADE' })
    category: Category;
    
}

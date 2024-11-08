import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column({ unique: true })
    accountName: string;

    @Column()
    accountType: string;

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
    balance: number;

    @Column({ nullable: true })
    currency?: string;

    @Column({ nullable: true })
    description?: string;

    @ManyToOne(() => User, (user) => user.accounts, {onDelete: 'CASCADE'})
    user: User;
}

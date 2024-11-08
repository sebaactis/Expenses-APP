import { User } from "src/users/entities/user.entity";

export interface AccountResponse {
    id: number;
    userId: number;
    accountName: string;
    accountType: string;
    balance: number;
    currency?: string;
    description?: string;
    user: User;
}
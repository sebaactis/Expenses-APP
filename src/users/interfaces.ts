export interface UserResponse {
    id?: number;
    email: string;
    username: string;
    message?: string;
    password?: string;
    country?: string;
    preferCurrency?: string;
    spendingLimit?: number;
}
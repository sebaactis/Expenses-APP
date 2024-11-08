export interface UserResponse {
    email: string;
    username: string;
    message?: string;
    password?: string;
    country?: string;
    preferCurrency?: string;
    spendingLimit?: number;
}
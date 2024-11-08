import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    confirmPassword: string;

    @IsString()
    country: string;

    @IsString()
    preferCurrency: string;

    @IsNumber()
    spendingLimit: number;
}
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    categoryId: number;

    @IsString()
    description?: string;

    @IsNotEmpty()
    date: Date;

    @IsNotEmpty()
    @IsNumber()
    amount: number;
}

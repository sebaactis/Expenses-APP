import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateTransactionDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    @IsNumber()
    amount: number;
}

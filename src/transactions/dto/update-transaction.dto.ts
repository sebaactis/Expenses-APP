import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTransactionDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDate()
    date?: Date;

    @IsOptional()
    @IsNumber()
    amount?: number;
}

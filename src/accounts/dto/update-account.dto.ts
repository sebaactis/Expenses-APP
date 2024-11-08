import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";

export class UpdateAccountDto {
    @IsOptional()
    @IsString()
    accountName?: string;

    @IsOptional()
    @IsString()
    accountType?: string;

    @IsOptional()
    @IsNumber()
    balance?: number;

    @IsOptional()
    @IsString()
    currency?: string;

    @IsOptional()
    @IsString()
    description?: string;
}

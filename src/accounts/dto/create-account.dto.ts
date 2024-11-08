import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAccountDto {

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    accountName: string;

    @IsString()
    @IsNotEmpty()
    accountType: string;

    @IsNumber()
    @IsNotEmpty()
    balance: number;

    @IsString()
    currency: string;

    @IsString()
    description: string;

}

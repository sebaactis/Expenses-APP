import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    @Length(4, 16)
    name: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}

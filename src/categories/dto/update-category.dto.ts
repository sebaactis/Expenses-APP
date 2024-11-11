import { IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateCategoryDto {

    @IsNotEmpty()
    @IsString()
    @Length(4, 16)
    name: string;
}

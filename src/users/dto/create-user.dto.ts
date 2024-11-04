import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(5, 16)
    username: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    password: string;
}

import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register-dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const newUser = await this.userService.create(registerDto);

        return {
            message: 'User registered successfully',
            user: { email: newUser.email },
        };
    }

    async login(loginDto: LoginDto) {
        const user = await this.userService.findOne(loginDto.email);

        if (!user) {
            throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
        }

        const checkPassword = await bcrypt.compare(loginDto.password, user.password);

        if (!checkPassword) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = { email: user.email, username: user.username };

        return {
            message: 'Login successfully',
            access_token: await this.jwtService.signAsync(payload),
        };
    }

}

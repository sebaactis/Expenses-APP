import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { jwtSecret } from 'src/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '60s' },
    })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }

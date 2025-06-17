import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { SigninResponseDto } from './dto/signin-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<AuthUserDto | null> {
    try {
      const user = await this.usersService.findOneByUsername(username);
      if (user && bcrypt.compareSync(pass, user.password)) {
        const result: AuthUserDto = {
          id: user.id,
          username: user.username,
          birthdate: user.birthdate,
          balance: user.balance,
        };
        return result;
      }
      return null;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao validar usuário:', error.message);
      } else {
        console.error('Erro desconhecido ao validar usuário:', error);
      }
      return null;
    }
  }

  login(user: AuthUserDto): SigninResponseDto {
    const payload = { username: user.username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      expiresIn: process.env.JWT_EXPIRES_IN || '60s',
    };
  }
}

import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('users')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('signup')
  async signup(
    @Body() body: { username: string; password: string; birthdate: Date },
  ) {
    const existingUser = await this.usersService.findOneByUsername(
      body.username,
    );
    if (existingUser) {
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }
    return this.usersService.create(body);
  }

  @Post('signin')
  async signin(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return this.authService.login(user);
  }
}
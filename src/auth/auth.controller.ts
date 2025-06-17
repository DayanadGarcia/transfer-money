import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { SigninResponseDto } from './dto/signin-response.dto';
import { SignupResponseDto } from 'src/users/dto/signup-response.dto';
import { SignupDto } from 'src/users/dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('users')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() body: SignupDto): Promise<SignupResponseDto> {
    const existingUser = await this.usersService.findOneByUsername(
      body.username,
    );
    if (existingUser) {
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }
    return this.usersService.create(body);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() body: SigninDto): Promise<SigninResponseDto> {
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

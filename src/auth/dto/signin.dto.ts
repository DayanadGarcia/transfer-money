/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, MinLength } from 'class-validator';

export class SigninDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}

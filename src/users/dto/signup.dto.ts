/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsDateString, MinLength, IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsDateString()
  birthdate: Date;
}

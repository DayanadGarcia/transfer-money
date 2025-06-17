/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsDateString, IsNumber, IsNotEmpty } from 'class-validator';

export class AuthUserDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsDateString()
  birthdate: Date;

  @IsNumber()
  balance: number;
}

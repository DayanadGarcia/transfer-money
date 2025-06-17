/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsDateString, IsNumber } from 'class-validator';

export class UserPublicDto {
  @IsString()
  id: string;

  @IsString()
  username: string;

  @IsDateString()
  birthdate: Date;

  @IsNumber()
  balance: number;
}

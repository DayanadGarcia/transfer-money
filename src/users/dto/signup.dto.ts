/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsDateString,
  MinLength,
  IsNotEmpty,
  Matches,
} from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      'A senha deve conter ao menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
  })
  password: string;

  @IsDateString()
  birthdate: Date;
}

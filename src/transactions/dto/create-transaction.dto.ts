import { IsUUID, IsNumber, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  toId: string;

  @IsNumber()
  @Min(0.01, { message: 'Amount must be greater than zero' })
  amount: number;
}

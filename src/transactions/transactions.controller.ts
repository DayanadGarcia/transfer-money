import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transfer')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async transfer(
    @Req() req: any,
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const fromId = req.user.id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.transactionsService.transfer(fromId, createTransactionDto);
    return;
  }
}

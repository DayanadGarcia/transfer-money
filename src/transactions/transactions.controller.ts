import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionListDto } from './dto/transaction-list.dto';
import { TransactionDetailDto } from './dto/transaction-detail.dto';

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

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<TransactionListDto[]> {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<TransactionDetailDto> {
    return this.transactionsService.findOne(id);
  }
}

import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionsService } from './transactions.service';

@Controller('transfer')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async transfer(
    @Req() req: any,
    @Body() body: { toId: string; amount: number },
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const fromId = req.user.sub;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.transactionsService.transfer(fromId, body.toId, body.amount);
    return { message: 'Transfer successful' };
  }
}

import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionListDto } from './dto/transaction-list.dto';
import { TransactionDetailDto } from './dto/transaction-detail.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Transaction) private txRepo: Repository<Transaction>,
  ) {}

  async transfer(fromId: string, { toId, amount }: CreateTransactionDto) {
    if (fromId === toId) {
      throw new HttpException(
        'Cannot transfer to yourself',
        HttpStatus.BAD_REQUEST,
      );
    }

    const [fromUser, toUser] = await Promise.all([
      this.usersRepository.findOne({ where: { id: fromId } }),
      this.usersRepository.findOne({ where: { id: toId } }),
    ]);

    if (!fromUser || !toUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (fromUser.balance < amount) {
      throw new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);
    }

    fromUser.balance = parseFloat((fromUser.balance - amount).toFixed(2));
    toUser.balance = parseFloat((toUser.balance + amount).toFixed(2));

    await this.usersRepository.save([fromUser, toUser]);

    const tx = this.txRepo.create({ fromId, toId, amount });
    await this.txRepo.save(tx);
  }

  async findAll(): Promise<TransactionListDto[]> {
    return this.txRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<TransactionDetailDto> {
    const tx = await this.txRepo.findOne({ where: { id } });

    if (!tx) {
      throw new NotFoundException('Transação não encontrada');
    }

    return tx;
  }
}

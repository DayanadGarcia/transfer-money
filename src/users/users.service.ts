import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<{ id: string }> {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const newUser = await this.usersRepository.save({
      ...user,
      password: hashedPassword,
    });
    return { id: newUser.id };
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  findAll(): Promise<Omit<User, 'password'>[]> {
    return this.usersRepository.find({
      select: ['id', 'username', 'birthdate', 'balance'],
    });
  }
}

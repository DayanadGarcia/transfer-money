import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { SignupDto } from './dto/signup.dto';
import { SignupResponseDto } from './dto/signup-response.dto';
import { UserPublicDto } from './dto/user-public.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: SignupDto): Promise<SignupResponseDto> {
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

  async findAll(): Promise<UserPublicDto[]> {
    const users = await this.usersRepository.find({
      select: ['id', 'username', 'birthdate', 'balance'],
    });
    return users as UserPublicDto[];
  }
}

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

const users = [
  {
    email: 'admin@example.com',
    password: 'teamwork',
    role: UserRole.ADMIN,
  },
  {
    email: 'user@example.com',
    password: 'teamwork',
    role: UserRole.ADMIN,
  },
];

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    users.forEach((user) => {
      const existingUser = this.userRepository.findOne({
        where: { email: user.email },
      });
      if (!existingUser) {
        this.userRepository.save(user);
      }
    });
  }

  async login(body: { username: string; password: string }) {
    const user = await this.userRepository.findOneBy({ email: body.username });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password !== body.password) {
      throw new UnauthorizedException('Invalid password');
    }
    return this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }
}

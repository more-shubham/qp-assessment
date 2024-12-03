import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(body: { email: string; password: string }) {
    const user = await this.userRepository.findOne({
      where: { email: body.email },
    });
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

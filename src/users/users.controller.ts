import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return await this.usersService.login(body);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

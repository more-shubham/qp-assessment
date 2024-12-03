import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      // @command: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
      secret:
        '254a9852c75e665189f5fc25a0cc92159cd69d92e22a608f0f94a62854d49593',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

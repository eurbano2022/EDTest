import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { ServicesService } from './services/users.service';
import { UsersService } from './services/users.service';

@Module({
  controllers: [UsersController],
  providers: [ServicesService, UsersService]
})
export class UsersModule {}

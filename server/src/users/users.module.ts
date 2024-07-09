import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  exports: [UsersService],
  providers: [UsersService],
  imports: [DrizzleModule],
})
export class UsersModule {}

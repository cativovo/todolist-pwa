import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [DrizzleModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}

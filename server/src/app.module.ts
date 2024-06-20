import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TodosModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}

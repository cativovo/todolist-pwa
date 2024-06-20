import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(CreateTodoDto)) createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    return await this.todosService.create(createTodoDto);
  }

  @Get()
  async findAll(): Promise<Todo[]> {
    return await this.todosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    const todo = await this.todosService.findOne(id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateTodoDto)) updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    const todo = await this.todosService.update(id, updateTodoDto);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.todosService.remove(id);
  }
}

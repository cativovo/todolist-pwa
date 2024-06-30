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
  Req,
  UseGuards,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AuthGuard } from 'src/guards';
import { ZodValidationPipe } from 'src/pipes';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';
import { Todo } from './schemas/todo';

@UseGuards(AuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(
    @Req() req: FastifyRequest,
    @Body(new ZodValidationPipe(CreateTodoDto)) createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    return await this.todosService.create(req.user.id, createTodoDto);
  }

  @Get()
  async findAll(): Promise<Pick<Todo, 'id' | 'title'>[]> {
    return await this.todosService.findAll();
  }

  @Get(':id')
  async findOne(
    @Req() req: FastifyRequest,
    @Param('id') id: string,
  ): Promise<Todo> {
    const todo = await this.todosService.findOne(req.user.id, id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  @Patch(':id')
  async update(
    @Req() req: FastifyRequest,
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
  async remove(
    @Req() req: FastifyRequest,
    @Param('id') id: string,
  ): Promise<void> {
    return await this.todosService.remove(id);
  }
}

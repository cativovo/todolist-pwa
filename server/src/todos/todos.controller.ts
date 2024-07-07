import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AuthGuard } from 'src/guards';
import { ZodValidationPipe } from 'src/pipes';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@UseGuards(AuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {
    todosService.seed(101);
  }

  @Post()
  async create(
    @Req() req: FastifyRequest,
    @Body(new ZodValidationPipe(CreateTodoDto)) createTodoDto: CreateTodoDto,
  ) {
    // TODO: check if pipes can do this
    createTodoDto.title = createTodoDto.title.trim();
    createTodoDto.description = createTodoDto.description.trim();
    return await this.todosService.create(req.user.id, createTodoDto);
  }

  @Get()
  async findAll(
    @Req() req: FastifyRequest,
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
  ) {
    const limit = 10;
    const offset = (page - 1) * limit;
    const result = await this.todosService.findAll(req.user.id, {
      limit,
      offset,
    });

    return {
      todos: result.todos,
      pages: Math.ceil(result.count / limit),
    };
  }

  @Get(':id')
  async findOne(@Req() req: FastifyRequest, @Param('id') id: string) {
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
  ) {
    const todo = await this.todosService.update(id, updateTodoDto);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Req() req: FastifyRequest, @Param('id') id: string) {
    return await this.todosService.remove(id);
  }
}

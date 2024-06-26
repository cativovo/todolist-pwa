import { Session as FastifySession } from '@fastify/secure-session';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AuthGuard } from 'src/guards';
import { ZodValidationPipe } from 'src/pipes';
import sleep from 'src/sleep';
import { UserWithoutPassword } from 'src/users/schemas/user';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Body(new ZodValidationPipe(LoginDto)) body: LoginDto,
    @Session() session: FastifySession,
  ): Promise<UserWithoutPassword> {
    const user = await this.authService.login(body.username, body.password);

    if (!user) {
      throw new UnauthorizedException();
    }

    session.set('user', user);

    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  async me(
    @Session() session: FastifySession,
    @Req() req: FastifyRequest,
  ): Promise<UserWithoutPassword> {
    await sleep();
    session.touch();

    return req.user;
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Session() session: FastifySession): Promise<void> {
    await sleep();
    session.delete();
  }
}

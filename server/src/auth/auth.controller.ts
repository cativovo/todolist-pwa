import { Session as FastifySession } from '@fastify/secure-session';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { PostgresError } from 'postgres';
import { UserWithoutPassword } from 'src/drizzle/schema';
import { ZodValidationPipe } from 'src/pipes';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  async signup(
    @Body(new ZodValidationPipe(SignUpDto)) body: SignUpDto,
    @Session() session: FastifySession,
  ): Promise<UserWithoutPassword> {
    try {
      const user = await this.authService.signup(body.username, body.password);

      session.set('user', user);

      return user;
    } catch (err) {
      if (
        err instanceof PostgresError &&
        err.constraint_name === 'users_username_unique'
      ) {
        throw new BadRequestException('Username already used!');
      }

      Logger.error(err);
      throw err;
    }
  }

  @Public()
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

  @Get('/me')
  async me(
    @Session() session: FastifySession,
    @Req() req: FastifyRequest,
  ): Promise<UserWithoutPassword> {
    session.touch();
    return req.user;
  }

  @Post('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Session() session: FastifySession): Promise<void> {
    session.delete();
  }
}

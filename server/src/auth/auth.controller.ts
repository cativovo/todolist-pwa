import { Session as FastifySession } from '@fastify/secure-session';
import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes';
import sleep from 'src/sleep';
import { UserWithoutPassword } from 'src/users/users.service';
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

  @Get('/me')
  async me(@Session() session: FastifySession): Promise<UserWithoutPassword> {
    await sleep();
    const user = session.get('user');

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  @Post('/logout')
  async logout(@Session() session: FastifySession): Promise<void> {
    await sleep();
    session.delete();
  }
}

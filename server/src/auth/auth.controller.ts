import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/pipes';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Body(new ZodValidationPipe(LoginDto)) body: LoginDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.authService.login(body.username, body.password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

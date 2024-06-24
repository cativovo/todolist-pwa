import { Injectable } from '@nestjs/common';
import { User, UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async login(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | undefined> {
    const user = await this.userService.findUserByUsername(username);

    if (user?.password !== password) {
      return undefined;
    }

    delete (user as Partial<User>).password;

    return user;
  }
}

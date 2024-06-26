import { Injectable } from '@nestjs/common';
import {
  User,
  UserWithoutPassword,
  UsersService,
} from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async login(
    username: string,
    password: string,
  ): Promise<UserWithoutPassword | undefined> {
    const user = await this.userService.findUserByUsername(username);

    if (user?.password !== password) {
      return undefined;
    }

    delete (user as Partial<User>).password;

    return user;
  }
}

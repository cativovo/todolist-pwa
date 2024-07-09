import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User, UserWithoutPassword } from 'src/drizzle/schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async login(
    username: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.userService.findUserByUsername(username);

    if (!user) {
      return null;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return null;
    }

    delete (user as Partial<User>).password;

    return user;
  }

  async signup(
    username: string,
    password: string,
  ): Promise<UserWithoutPassword> {
    const user = await this.userService.addUser(username, password);

    delete (user as Partial<User>).password;

    return user;
  }
}

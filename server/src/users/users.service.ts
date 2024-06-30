import { Injectable } from '@nestjs/common';
import sleep from 'src/sleep';
import { User } from './schemas/user';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      username: 'user1',
      password: 'user1',
    },
    {
      id: '2',
      username: 'user2',
      password: 'user2',
    },
  ];

  async findUserByUsername(username: string): Promise<User | undefined> {
    await sleep();
    const user = this.users.find((v) => v.username === username);

    if (!user) {
      return undefined;
    }

    return { ...user };
  }
}

import { Injectable } from '@nestjs/common';
import sleep from 'src/sleep';
import { z } from 'zod';

export const User = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});
export type User = z.infer<typeof User>;

export const UserWithoutPassword = User.omit({ password: true });
export type UserWithoutPassword = z.infer<typeof UserWithoutPassword>;

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

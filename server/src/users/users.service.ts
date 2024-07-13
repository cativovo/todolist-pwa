import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { User, UserWithoutPassword, users } from 'src/drizzle/schema';

@Injectable()
export class UsersService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findUserByUsername(username: string): Promise<User | null> {
    const result = await this.drizzleService.db
      .select()
      .from(users)
      .where(eq(users.username, username));

    return result[0] ?? null;
  }

  async findUserById(id: string): Promise<UserWithoutPassword | null> {
    const result = await this.drizzleService.db
      .select({ id: users.id, username: users.username })
      .from(users)
      .where(eq(users.id, id));

    return result[0] ?? null;
  }

  async addUser(
    username: string,
    password: string,
  ): Promise<UserWithoutPassword> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await this.drizzleService.db
      .insert(users)
      .values({ username, password: hashedPassword })
      .returning({
        id: users.id,
        username: users.username,
      });

    return result[0];
  }
}

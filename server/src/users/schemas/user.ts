import { z } from 'zod';

export const User = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});
export type User = z.infer<typeof User>;

export const UserWithoutPassword = User.omit({ password: true });
export type UserWithoutPassword = z.infer<typeof UserWithoutPassword>;

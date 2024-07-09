import { User } from 'src/drizzle/schema';
import { z } from 'zod';

export const SignUpDto = User.pick({ password: true, username: true });
export type SignUpDto = z.infer<typeof SignUpDto>;

import { User } from 'src/users/schemas/user';
import { z } from 'zod';

export const SignUpDto = User.pick({ password: true, username: true });
export type SignUpDto = z.infer<typeof SignUpDto>;

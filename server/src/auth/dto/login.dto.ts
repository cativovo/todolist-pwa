import { User } from 'src/users/users.service';
import { z } from 'zod';

export const LoginDto = User.pick({ username: true, password: true });
export type LoginDto = z.infer<typeof LoginDto>;

import { z } from "zod";

export const User = z.object({
  id: z.string(),
  username: z.string(),
});
export type User = z.infer<typeof User>;

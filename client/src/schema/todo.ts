import { z } from "zod";

export const Todo = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
export type Todo = z.infer<typeof Todo>;

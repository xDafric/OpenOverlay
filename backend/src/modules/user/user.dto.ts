import { roles } from "@/betterAuth/permissions.js";
import z from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
  role: z.enum(["admin", "user"]),
});
export type CreateUserDTO = z.infer<typeof createUserSchema>;

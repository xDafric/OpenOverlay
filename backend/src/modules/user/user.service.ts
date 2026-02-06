import type { User } from "better-auth";
import type { CreateUserDTO } from "./user.dto.js";
import { userRepository } from "./user.repository.js";
import type { PaginationInput, PaginationResult } from "@/utils/pagination.js";
import type { Role } from "@/betterAuth/permissions.js";

export const userService = {
  createUser: async (data: CreateUserDTO) => {
    const id = crypto.randomUUID();

    const result = await userRepository.create({ ...data, id });
    return result;
  },
  listUsers: async (data: PaginationInput): Promise<PaginationResult<User>> => {
    return await userRepository.list(data);
  },
  setRole: async (userId: string, role: Role) => {
    return await userRepository.update(userId, { role });
  },
};

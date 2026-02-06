import type { Role } from "@/betterAuth/permissions.js";
import { db } from "@/db/db.js";
import { user } from "@/modules/auth/auth.schema.js";
import {
  withCursorPagination,
  type PaginationInput,
} from "@/utils/pagination.js";
import { eq } from "drizzle-orm";

export type NewUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  role: Role;
};

export const userRepository = {
  create: async (data: NewUser) => db.insert(user).values(data),
  list: async (data: PaginationInput) =>
    withCursorPagination({
      query: db.select().from(user).$dynamic(),
      idField: user.id,
      sortableFields: [user.name, user.email],
      cursor: data.cursor,
      pageSize: data.page_size,
      sortField: data.sort_field,
      sortDirection: data.sort_direction,
    }),
  update: async (userId: string, data: Partial<NewUser>) => {
    return db.update(user).set(data).where(eq(user.id, userId)).returning();
  },
};

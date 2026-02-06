import { createAccessControl } from "better-auth/plugins";
import {
  adminAc,
  defaultStatements,
  userAc,
} from "better-auth/plugins/admin/access";
import type { auth } from "./auth.js";

export const statement = {
  ...defaultStatements,
  project: ["create", "share", "update", "delete"],
} as const;

export type Permission =
  NonNullable<
    NonNullable<Parameters<typeof auth.api.userHasPermission>[0]>["body"]
  > extends { permissions: infer P } | { permission: infer P }
    ? NonNullable<P>
    : never;

export const ac = createAccessControl(statement);

const admin = ac.newRole({
  ...adminAc.statements,
});

const user = ac.newRole({
  project: ["create"],
});

const verifiedUser = ac.newRole({
  ...userAc.statements,
});

export const roles = {
  user,
  verifiedUser,
  admin,
};

export type Role = keyof typeof roles;

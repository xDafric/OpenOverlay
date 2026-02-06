import { auth } from "@/betterAuth/auth.js";
import type { Permission } from "@/betterAuth/permissions.js";
import type { NextFunction, Request, Response } from "express";

export const requirePermission =
  (permissions: Permission) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await auth.api.userHasPermission({
      body: { userId: req.user?.id, permissions: permissions },
    });
    if (data.success) {
      next();
    } else {
      res.status(403).json({ message: data.error });
    }
  };

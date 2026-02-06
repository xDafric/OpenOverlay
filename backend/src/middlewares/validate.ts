import type { NextFunction, Request, Response } from "express";
import { z, type ZodType } from "zod";

export const validateBody =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      return res.status(400).json({ error: "No Body" });
    }
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: z.treeifyError(result.error) });
    }
    req.body = result.data;
    next();
  };

export const validateQueryParams =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({ error: z.treeifyError(result.error) });
    }
    next();
  };

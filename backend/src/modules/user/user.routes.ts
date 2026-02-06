import { Router } from "express";
import { validateBody, validateQueryParams } from "@/middlewares/validate.js";
import { createUserSchema } from "./user.dto.js";
import { createUser, listUsers } from "./user.controller.js";
import { paginationParams } from "@/utils/pagination.js";
import { requirePermission } from "@/middlewares/checkPermission.js";

const router = Router();

router.post("/", validateBody(createUserSchema), createUser);
router.get(
  "/",
  requirePermission({ project: ["create"] }),
  validateQueryParams(paginationParams),
  listUsers,
);

export default router;

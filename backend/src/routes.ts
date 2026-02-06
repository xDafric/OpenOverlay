import { Router } from "express";
import userRoutes from "./modules/user/user.routes.js";
import { requireAuth } from "./middlewares/checkAuth.js";

const router = Router();

router.use("/user", requireAuth, userRoutes);

export default router;

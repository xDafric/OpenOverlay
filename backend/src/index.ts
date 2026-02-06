import type { Session, User } from "better-auth";
import app from "./app.js";
import { env } from "./config/config.js";

declare module "express-serve-static-core" {
  interface Request {
    session?: Session;
    user?: User;
  }
}

const PORT = env.port;

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});

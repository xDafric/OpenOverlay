import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./betterAuth/auth.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import apiRoutes from "./routes.js";
import { env } from "./config/config.js";
import morgan from "morgan";

const app = express();

const allowedOrigins = [env.url];

app.use(
  morgan(
    ":remote-addr - :remote-user [:date[clf]] :method :url :status :response-time ms",
  ),
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.use("/api/v1/", apiRoutes);

app.use(errorHandler);

export default app;

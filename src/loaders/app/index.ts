// appLoader.ts
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import { createServer, Server } from "http";
import morgan from "morgan";

const PORT = parseInt(process.env.PORT || "3001", 10);
const HOST = process.env.HOST || "0.0.0.0";

const appLoader = async (app: Express, router: any) => {
  console.log("Starting URL Backend Service...");

  return new Promise<void>((resolve) => {
    const server: Server = createServer(app);

    // Express Middlewares
    const allowedOrigins = (process.env.CORS_ORIGINS ?? "")
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean);
    // fallback to defaults if env empty
    if (!allowedOrigins.length) {
      allowedOrigins.push(
        "https://project-management-frontend-ivory.vercel.app",
        "http://localhost:5173"
      );
    }

    app.use((req, res, next) => {
      const origin = req.headers.origin as string | undefined;

      if (origin && allowedOrigins.includes(origin)) {
        // explicit single origin → works with credentials=true
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Vary", "Origin"); // caches one header per origin
      }

      // CORS essentials when credentials=true
      res.header("Access-Control-Allow-Credentials", "true");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,PATCH,DELETE,OPTIONS"
      );

      // intercept the pre‑flight OPTIONS call
      if (req.method === "OPTIONS") {
        return res.sendStatus(204);
      }

      next();
    });
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(morgan("dev"));

    // Routes
    app.use("/api", router);

    // 404 Middleware
    app.use((req, res) => {
      res.status(404).send({
        success: false,
        data: undefined,
        message: "The resource you are looking for is not found.",
      });
    });

    // Start Server
    server.listen(PORT, HOST, () => {
      console.log(`Server running on ${HOST}:${PORT}`);
      resolve();
    });
  });
};

export { appLoader };

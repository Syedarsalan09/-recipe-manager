import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import recipeRoutes from "./routes/recipeRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use("/api/recipes", recipeRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", (req, res) => {
  res.status(404).json({ message: "Route not found." });
});

const DEFAULT_PORT = Number(process.env.PORT) || 5000;

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      const nextPort = port + 1;
      console.warn(`Port ${port} is busy. Trying ${nextPort} instead...`);
      startServer(nextPort);
      return;
    }

    throw error;
  });
};

startServer(DEFAULT_PORT);
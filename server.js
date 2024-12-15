import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import errorHandler from "./src/helpers/errorhandler.js";
import userRouter from "./src/routes/userRoutes.js";
import taskRouter from "./src/routes/tasksRoutes.js";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

// Middleware for CORS
app.use(
  cors()
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Error handler middleware
// app.use(errorHandler);

// Routes
app.use("/api/v1", userRouter);
app.use("/", taskRouter);

// Start the server
const server = async () => {
  try {
    await connect();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Failed to start server.....", error.message);
    process.exit(1);
  }
};

server();

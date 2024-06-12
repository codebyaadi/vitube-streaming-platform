import * as dotenv from "dotenv";
import express from "express";
import connectDB from "./src/config/connect.js";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import videoRoutes from "./src/routes/videoRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js"

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "https://vitube-streaming-platform.vercel.app",
      "http://localhost:5173",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", videoRoutes);
app.use("/api", commentRoutes)

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello! VisualVerse backend!",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
  });
});

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

startServer();

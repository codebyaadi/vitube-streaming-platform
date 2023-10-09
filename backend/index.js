import * as dotenv from "dotenv";
import express from "express";
import connectDB from "./db/config/connect.js";
import cors from "cors";
import userRoutes from "./db/routes/userRoutes.js"
import videoRoutes from "./db//routes/videoRoutes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", videoRoutes)

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello! VisualVerse backend!',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
  });
});

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.error("Error connecting to the database:" , error);
    process.exit(1);
  }
};

startServer();

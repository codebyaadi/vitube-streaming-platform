import express from "express";
import multer from "multer";
import { getAllVideos, uploadVideo } from "../controllers/videoController.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

// // // // // // // // // // // // // // // // // // // // // // // // // //
// *                         VIDEO UPLOAD ROUTE                         *  //
// // // // // // // // // // // // // // // // // // // // // // // // // //

router.post("/v1/upload", upload.single('videoFile'), uploadVideo)

router.get("/v1/getAllVideos", getAllVideos)

export default router;
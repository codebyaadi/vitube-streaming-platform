import express from "express";
import multer from "multer";
import { getAllVideos, getSingleVideo, uploadVideo } from "../controllers/videoController.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

// // // // // // // // // // // // // // // // // // // // // // // // // //
// *                         VIDEO UPLOAD ROUTE                         *  //
// // // // // // // // // // // // // // // // // // // // // // // // // //

router.post("/v1/upload", upload.single('videoFile'), uploadVideo)

// // // // // // // // // // // // // // // // // // // // // // // // // //
// *                           ALL VIDEO ROUTE                          *  //
// // // // // // // // // // // // // // // // // // // // // // // // // //

router.get("/v1/getAllVideos", getAllVideos)

// // // // // // // // // // // // // // // // // // // // // // // // // //
// *                         SINGLE VIDEO ROUTE                         *  //
// // // // // // // // // // // // // // // // // // // // // // // // // //

router.get("/v1/getSingleVideos/:videoId", getSingleVideo)

export default router;
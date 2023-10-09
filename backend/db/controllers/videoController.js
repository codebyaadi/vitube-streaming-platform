import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Video from "../models/Videos.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadVideo = async (req, res) => {
  try {
    const { title, description, duration, uploadedBy, videoUrl } = req.body;

    const newVideo = await Video.create({
      title,
      description,
      duration,
      uploadedBy,
      videoUrl,
    });

    return res.status(201).json({ message: "Video uploaded successfully.", data: newVideo });
  } catch (error) {
    console.error("Error uploading video:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while uploading the video." });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find(); // Use your Mongoose model to query the database for videos
    res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'An error occurred while fetching videos.' });
  }
};

import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Video from "../models/Videos.js";
import User from "../models/Users.js";
import calculateUploadedTime from "../utils/calcUploadTIme.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// // // // // // // // // // // // // // // // // // // // // // // // // // // //
// *                          UPLOAD VIDEO CONTROLLER                           * //
// // // // // // // // // // // // // // // // // // // // // // // // // // // //

export const uploadVideo = async (req, res) => {
  try {
    const { title, description, uploadedBy, videoUrl, thumbnailUrl } = req.body;

    const newVideo = await Video.create({
      title,
      description,
      uploadedBy,
      videoUrl,
      thumbnailUrl,
    });

    return res.status(201).json({ message: "Video uploaded successfully.", data: newVideo });
  } catch (error) {
    console.error("Error uploading video:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while uploading the video." });
  }
};

// // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// *                          GET ALL VIDEOS CONTROLLER                           * //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // //

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate({
      path: 'uploadedBy',
      model: User,
      select: 'fullName username profilePicture',
    });

    const currentTime = new Date();
    videos.forEach(video => {
      const createdAt = video.createdAt;
      const timeDifference = currentTime - createdAt;
      const elapsed = calculateUploadedTime(timeDifference);
      video.uploadedAgo = elapsed;
      console.log(video.uploadedAgo)
    });
    console.log("Data for the first video:", videos[0].uploadedAgo);
    res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'An error occurred while fetching videos.' });
  }
};

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// *                           GET SINGLE VIDEO CONTROLLER                           * //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

export const getSingleVideo = async (req, res) => {
  const { videoId } = req.params;
  console.log(videoId)

  try {
    const video = await Video.findById(videoId).populate({
      path: 'uploadedBy',
      model: User,
      select: "fullName username profilePicture"
    });

    if (!video) {
      return res.status(404).json({ message: 'Video not found.' });
    }

    video.views += 1;
    await video.save();

    // Calculate time difference in milliseconds
    const currentTime = new Date();
    const createdAt = video.createdAt;
    const timeDiff = currentTime - createdAt;

    // Calculate uploadedAgo
    video.uploadedAgo = calculateUploadedTime(timeDiff);

    res.status(200).json(video);
  } catch (error) {
    console.error('Error fetching video by ID:', error);
    res.status(500).json({ message: 'An error occurred while fetching the video.' });
  }
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// *                           GET VIDEOS BY USER                           * //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

export const getVideosByUser = async (req, res) => {
  console.log('Incoming request:', req.params); // Log the entire request parameters
  const { userId } = req.params;
  console.log('Extracted userId:', userId);

  try {
    const videos = await Video.find({ uploadedBy: userId }).populate({
      path: 'uploadedBy',
      model: User,
      select: "fullName username profilePicture"
    });; // Find all videos by the user with the provided userId
    

    if (!videos || videos.length === 0) {
      return res.status(404).json({ message: 'No videos found for this user.' });
    }

    // Calculate uploadedAgo for each video
    const currentTime = new Date();
    videos.forEach((video) => {
      const createdAt = video.createdAt;
      const timeDiff = currentTime - createdAt;
      video.uploadedAgo = calculateUploadedTime(timeDiff); // You need to define the `calculateUploadedTime` function
    });

    res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching videos by user ID:', error);
    res.status(500).json({ message: 'An error occurred while fetching the videos.' });
  }
}

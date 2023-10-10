import React, { useState } from "react";
import axios from "axios";
import useUserInfoFromToken from "../../hooks/userinfo";

const VideoUpload = () => {
  const user = useUserInfoFromToken();

  // State variables
  const [msg, setMsg] = useState("");
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Event handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      setMsg("Please select a video file!");
      return;
    }

    try {
      setLoading(true);
      const videoUrl = await uploadVideo();
      const thumbnailUrl = await uploadImage();

      if (videoUrl && thumbnailUrl) {
        await saveVideoInfoToDatabase(videoUrl, thumbnailUrl);
        setMsg(
          "Video uploaded successfully and information saved to the database."
        );
      } else {
        console.error("Video upload failed");
        setMsg("Video upload failed. Please try again.");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error uploading video:", error);
      setMsg(
        error.response?.data.message ||
          "An error occurred while uploading the video."
      );
    }
  };

  const uploadVideo = async () => {
    const data = new FormData();
    data.append("file", video);
    data.append("upload_preset", "my_video"); // Replace with your Cloudinary preset

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const resourceType = "video";
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const config = {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Uploading: ${percentCompleted}%`);
          setPercent(percentCompleted);
        },
      };

      const res = await axios.post(api, data, config);
      const { secure_url } = res.data;

      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };
  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "my_image"); // Replace with your Cloudinary preset

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const resourceType = "image";
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;

      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const saveVideoInfoToDatabase = async (videoUrl, thumbnailUrl) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/upload", // Adjust the route as needed
        {
          ...formData,
          uploadedBy: user.userId,
          thumbnailUrl: thumbnailUrl,
          videoUrl: videoUrl,
        }
      );

      if (response.status === 201) {
        console.log("Video information saved to the database.", response.data);
      } else {
        console.error("Failed to save video information to the database.");
      }
    } catch (error) {
      console.error("Error saving video information to the database:", error);
    }
  };

  return (
    <div className="w-auto mt-16 ml-64 bg-[#282828] border border-[#3E3E3E] py-16 px-8 rounded-sm flex flex-col gap-2 font-prompt">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-xl font-semibold">Upload Video</h1>
          <h3 className="text-sm font-medium">Upload a video file</h3>
          {msg && <span className="text-red-500">{msg}</span>}
        </div>
        <div className="w-full">
          {["title", "description"].map((name) => (
            <div
              key={name}
              className="relative w-full flex flex-col items-start mt-2"
            >
              <label className="text-sm" htmlFor={name}>
                {name.charAt(0).toUpperCase() + name.slice(1)}{" "}
                {/* Capitalize the field name */}
              </label>
              <input
                className="w-full text-sm px-2 py-2.5 mt-2 rounded border border-[#3E3E3E] bg-[#1F1F1F] focus:outline-none"
                type="text"
                name={name}
                id={name}
                value={formData[name]}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* File input for video selection */}
          <div className="relative w-full flex flex-col items-start mt-2">
            <label className="text-sm" htmlFor="videoFile">
              Select Video
            </label>
            <input
              className="w-full text-sm px-2 py-2.5 mt-2 rounded border border-[#3E3E3E] bg-[#1F1F1F] focus:outline-none"
              type="file"
              name="videoFile"
              id="videoFile"
              accept="video/*"
              onChange={handleFileChange}
            />
          </div>
          {/* File input for image selection */}
          <div className="relative w-full flex flex-col items-start mt-2">
            <label className="text-sm" htmlFor="videoFile">
              Select Thumbnail
            </label>
            <input
              className="w-full text-sm px-2 py-2.5 mt-2 rounded border border-[#3E3E3E] bg-[#1F1F1F] focus:outline-none"
              type="file"
              name="imageFile"
              id="imageFile"
              accept="image"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="bg-red-500 flex text-white font-normal justify-center items-center w-full text-sm px-2 py-2.5 mt-4 rounded-sm">
          <button className="w-full" type="submit" disabled={loading}>
            {loading ? `${percent}%` : "Upload Video"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoUpload;

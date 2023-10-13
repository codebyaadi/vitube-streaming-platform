import React, { useState } from "react";
import useUserInfoFromToken from "../../hooks/userinfo";
import api from "../../api/base/config";
import uploadVideo from "../../api/cloudinary/uploadVideo";
import uploadImage from "../../api/cloudinary/uploadImage";
import SelectBar from "../micro/selection-bar";

const VideoUpload = () => {
  const user = useUserInfoFromToken();

  // State variables
  const [msg, setMsg] = useState("");
  const [selectedVideoName, setSelectedVideoName] = useState("")
  const [selectedImageName, setSelectedImageName] = useState("")
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
    setSelectedVideoName(file.name)
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setSelectedImageName(file.name)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      setMsg("Please select a video file!");
      return;
    }

    try {
      setLoading(true);
      const videoUrl = await uploadVideo(video, setPercent);
      const thumbnailUrl = await uploadImage(image);

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

  const saveVideoInfoToDatabase = async (videoUrl, thumbnailUrl) => {
    try {
      const response = await api.post("/upload", {
        ...formData,
        uploadedBy: user.userId,
        thumbnailUrl: thumbnailUrl,
        videoUrl: videoUrl,
      });

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
    <div className="w-auto mt-16 ml-0 md:ml-64 lg:ml-64 bg-[#282828] border border-[#3E3E3E] py-16 px-8 rounded-sm flex flex-col gap-2 font-prompt">
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
            {/* <input
              className="w-full text-sm px-2 py-2.5 mt-2 rounded border border-[#3E3E3E] bg-[#1F1F1F] focus:outline-none"
              type="file"
              name="videoFile"
              id="videoFile"
              accept="video/*"
              onChange={handleFileChange}
            /> */}
            <div className="flex items-center justify-center w-full mt-2">
              <label
                for="videoFile"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p clasNames="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                  {selectedVideoName != "" && <SelectBar text={selectedVideoName} />}
                </div>
                <input
                  id="videoFile"
                  type="file"
                  className="hidden"
                  name="videoFile"
                  accept="video/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          {/* File input for image selection */}
          <div className="relative w-full flex flex-col items-start mt-2">
            <label className="text-sm" htmlFor="videoFile">
              Select Thumbnail
            </label>
            {/* <input
              className="w-full text-sm px-2 py-2.5 mt-2 rounded border border-[#3E3E3E] bg-[#1F1F1F] focus:outline-none"
              type="file"
              name="imageFile"
              id="imageFile"
              accept="image"
              onChange={handleImageChange}
            /> */}
            <div className="flex items-center justify-center w-full mt-2">
              <label
                for="imageFile"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p clasNames="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                  {selectedImageName != "" && <SelectBar text={selectedImageName} />}
                </div>
                <input
                  id="imageFile"
                  type="file"
                  className="hidden"
                  name="imageFile"
                  accept="image"
                  onChange={handleImageChange}
                />
              </label>
            </div>
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

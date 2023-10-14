// VideoPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import VideoCard from "../components/layout/video-card";
import api from "../api/base/config";
import VideoPageSkeleton from "../components/loading/VideoPageSkeleton";

const VideoPage = () => {
  const { videoId } = useParams(); // Get the videoId from the route parameter
  const [video, setVideo] = useState(null);
  const [suggestVideos, setSuggestVideos] = useState([]);

  useEffect(() => {
    api
      .get("/getAllVideos")
      .then((response) => {
        setSuggestVideos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Fetch the video details based on videoId
    api
      .get(`/getSingleVideos/${videoId}`) // Replace with your API endpoint
      .then((response) => {
        setVideo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [videoId]);

  if (!video) {
    return <VideoPageSkeleton />
  }

  return (
    <div id="main-container" className="flex flex-col md:flex-col lg:flex-row justify-between">
      <div id="main-video" className="flex flex-col w-full md:w-full lg:w-[70%] font-prompt">
        <div className="rounded w-full overflow-hidden">
          <ReactPlayer
            width={"100%"}
            height={"100%"}
            controls={true}
            url={video.videoUrl}
          />
        </div>
        <div className="flex flex-col gap-2 justify-start mt-4">
          <h2 className="flex-1 text-xl font-medium line-clamp-2">
            {video.title}
          </h2>
          <div className="flex flex-row justify-between items-center">
            <div
              id="user-info"
              className="flex justify-start content-center items-center"
            >
              <div className="block">
                <img
                  className="flex-shrink-0 w-10 h-10 rounded-full object-cover"
                  src={video.uploadedBy.profilePicture}
                  alt={video.uploadedBy.profilePicture}
                />
              </div>
              <div className="h-10 flex flex-col justify-center ml-4 leading-none">
                <h2 className="p-0 m-0 font-medium">
                  {video.uploadedBy.fullName}
                </h2>
                <span className="p-0 m-0 font-medium text-sm text-gray-500">
                  {video.uploadedBy.username}
                </span>
              </div>
            </div>
            <div
              id="action"
              className="bg-[#282828] flex justify-between gap-4 rounded px-4 py-2.5 m-0 lg:mr-4"
            >
              <button id="like">
                <ThumbsUp />
              </button>
              <span className="border-r border-[#3E3E3E]"></span>
              <button id="dislike">
                <ThumbsDown />
              </button>
            </div>
          </div>
          <div id="description" className="bg-[#282828] flex flex-col rounded p-2 my-2 m-0 lg:mr-4 mb-1">
            <span className="text-sm font-semibold text-gray-400">{video.uploadedAgo}</span>
            {video.description}
          </div>
        </div>
      </div>
      <div id="suggest-video" className="flex flex-col md:flex-row lg:flex-col gap-2 flex-wrap justify-center my-2">
        {suggestVideos.map((item) => (
          <VideoCard
            key={item._id}
            videoId={item._id}
            title={item.title}
            thumbnailUrl={item.thumbnailUrl}
            views={item.views}
            uploadedAgo={item.uploadedAgo}
            comment={item.comment}
            profilePicture={item.uploadedBy.profilePicture}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoPage;

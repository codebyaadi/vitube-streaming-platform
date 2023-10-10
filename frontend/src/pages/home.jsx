import React, { useEffect, useState } from "react";
import useUserInfoFromToken from "../hooks/userinfo";
import VideoCard from "../components/layout/video-card";
import axios from "axios";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/getAllVideos")
      .then((response) => {
        setVideos(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="mt-16 flex gap-2 flex-wrap">
      {videos.map((video) => (
        <VideoCard
          key={video._id}
          videoId={video._id}
          title={video.title}
          thumbnailUrl={video.thumbnailUrl}
          views={video.views}
          uploadedAgo={video.uploadedAgo}
          comment={video.comment}
          profilePicture={video.uploadedBy.profilePicture}
        />
      ))}
    </div>
  );
};

export default Home;

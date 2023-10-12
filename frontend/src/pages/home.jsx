import React, { useEffect, useState } from "react";
import VideoCard from "../components/layout/video-card";
import api from "../api/base/config";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    api
      .get("/getAllVideos")
      .then((response) => {
        setVideos(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex justify-center gap-3 flex-wrap">
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

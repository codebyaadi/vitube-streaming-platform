import React, { useEffect, useState } from "react";
import VideoCard from "../components/layout/videocard";
import api from "../api/base/config";
import HomeSkeleton from "../components/loading/HomeSkeleton";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get("/getAllVideos")
      .then((response) => {
        setVideos(response.data);
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Set loading to false in case of an error
      });
  }, []);

  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {isLoading ? ( // Display a loading indicator while fetching data
        <HomeSkeleton />
      ) : (
        videos.map((video) => (
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
        ))
      )}
    </div>
  );
};

export default Home;
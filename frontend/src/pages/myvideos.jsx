import React from 'react'
import { useState, useEffect } from 'react';
import api from '../api/base/config';
import HomeSkeleton from '../components/loading/HomeSkeleton';
import VideoCard from '../components/layout/videocard';
import useUserInfoFromToken from '../hooks/userinfo';

const MyVideos = () => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = useUserInfoFromToken();
    const userId = user.userId;
    useEffect(() => {
      api
        .get("/getVideosByUser", {userId})
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
    <div className="w-auto mt-16 ml-0 md:ml-64 lg:ml-64 flex justify-start gap-3 flex-wrap">
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
  )
}

export default MyVideos
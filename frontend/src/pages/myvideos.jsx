import React from "react";
import { useState, useEffect } from "react";
import api from "../api/base/config";
import HomeSkeleton from "../components/loading/HomeSkeleton";
import VideoCard from "../components/layout/videocard";
import useUserInfoFromToken from "../hooks/userinfo";

const MyVideos = () => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); // Add error state
    const user = useUserInfoFromToken();
    const userId = user.userId;

    useEffect(() => {
        if (userId) {
            api.get(`/getVideosByUser/${userId}`)
                .then((response) => {
                    setVideos(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setIsLoading(false);
                    setError("An error occurred while fetching videos.");
                });
        }
    }, [userId]);

    return (
        <div className="w-auto mt-16 ml-0 md:ml-64 lg:ml-64 flex justify-start gap-3 flex-wrap">
            {isLoading ? (
                <HomeSkeleton />
            ) : videos.length === 0 ? ( // Check if there are no videos
                <p>No videos found.</p>
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
            {error && <p>{error}</p>}{" "}
            {/* Display error message if an error occurred */}
        </div>
    );
};

export default MyVideos;

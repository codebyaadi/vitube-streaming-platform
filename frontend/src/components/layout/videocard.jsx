import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({
  title,
  views,
  thumbnailUrl,
  profilePicture,
  uploadedAgo,
  videoId
}) => {
  return (
    <div className="bg-[#282828] border border-[#3E3E3E] w-full lg:w-72 md:w-80 p-2">
      <div id="image-container" className="w-full h-32 overflow-hidden">
        <Link to = {`/video/${videoId}`}>
        <img className="w-full object-cover" src={thumbnailUrl} alt={title} />
        </Link>
      </div>
      <div className="w-full flex flex-col gap-2 justify-start items-start mt-2 font-prompt">
        <div className="flex flex-row flex-auto gap-2 justify-between items-center">
          <img
            className="flex-shrink-0 w-10 h-10 rounded-full object-cover"
            src={profilePicture}
            alt={profilePicture}
          />
          <Link to={`/video/${videoId}`} className="flex-1 text-base font-medium line-clamp-2">
            {title}
          </Link>
        </div>
        <div className="w-full flex justify-between">
          <span className="font-opensans font-semibold text-xs text-gray-400">
            Views: {views}
          </span>
          <span className="font-opensans font-semibold text-xs text-gray-400">
            {uploadedAgo}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

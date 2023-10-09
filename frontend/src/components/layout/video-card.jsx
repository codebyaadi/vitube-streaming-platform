import React from 'react'
import ReactPlayer from "react-player"
import { Link } from "react-router-dom"

const VideoCard = ({title, description, like, comment, videoUrl}) => {
  return (
    <div className="bg-[#282828] border border-[#3E3E3E] w-64 p-2">
        <div id="video-container"className="w-full h-64">
            <ReactPlayer width={"100%"} height={"100%"} url={videoUrl} controls />   
        </div>
        <div className="flex flex-col gap-2 justify-start items-start mt-2 font-prompt">
            <Link to="/">{title}</Link>
            <h3>{description}</h3>
            <span>Like: {like}</span>
            <span>Comment: {comment}</span>
        </div>
    </div>
  )
}

export default VideoCard
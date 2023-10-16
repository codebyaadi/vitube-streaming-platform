import React from "react";
import Sidebar from "../components/layout/sidebar";
import useUserInfoFromToken from "../hooks/userinfo";
import { Route, Routes } from "react-router-dom";
import Settings from "../components/forms/settings";
import VideoUpload from "../components/forms/upload";
import MyVideos from "./myvideos";

const Dashboard = () => {
  const user = useUserInfoFromToken();
  
  return (
    <div>
      <MyVideos />
      <Sidebar
        profile={user.profile}
        name={user.name}
        username={user.username}
        isOpen={false}
        setIsOpen={() => {}}
        visible="block"
      />
      <Routes>
        <Route path="settings" element={<Settings />} />
        <Route path="upload" element={<VideoUpload />} />
      </Routes>
    </div>
  );
};

export default Dashboard;

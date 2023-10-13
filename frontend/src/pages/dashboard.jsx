import React from "react";
import Sidebar from "../components/layout/sidebar";
import useUserInfoFromToken from "../hooks/userinfo";
import { Route, Routes } from "react-router-dom";
import Settings from "../components/forms/settings";
import VideoUpload from "../components/forms/upload";

const Dashboard = () => {
  const user = useUserInfoFromToken();
  console.log("Dashboard", user.userId);
  
  return (
    <div>
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

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from "js-cookies";
import useUserInfoFromToken from '../../hooks/userinfo';

const Sidebar = ({profile, name, username}) => {
  const user = useUserInfoFromToken();
    const navigate = useNavigate();
    // Function to handle logout
    const handleLogout = () => {
      // Clear the token or perform any other necessary logout actions
      Cookies.removeItem("token", { secure: true, sameSite: "None" });
      navigate("/");
    };
  return (
    <aside className="fixed top-0 left-0 h-screen bg-[#282828] w-64 border-r border-[#3E3E3E] pt-24">
        <div className="flex flex-col justify-center items-center" id="profile">
            <img src={profile} alt="Profile Photo" className="rounded-full w-28 h-28 object-cover" />
            <div className="flex flex-col justify-center items-center mt-4" id="profile-basic-details">
                <h2 className="font-prompt text-base">{name}</h2>
                <p className="font-prompt text-sm text-white/60">@{username}</p>
            </div>
        </div>
        <div id="menus">
          <Link to={`/dashboard/${user.userId}/upload`} className="border-b border-[#3E3E3E] py-3">Upload</Link>
        </div>
        <div id="bottom-menus" className="w-full flex flex-col absolute bottom-0 font-prompt text-base border-t border-[#3E3E3E] px-3">
          <Link to={`/dashboard/${user.userId}/settings`} className="border-b border-[#3E3E3E] py-3">Setting</Link>
          <button onClick={handleLogout} className="text-start py-3">Log Out</button>
        </div>
    </aside>
  )
}

export default Sidebar
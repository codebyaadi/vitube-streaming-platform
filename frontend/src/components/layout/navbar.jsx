import React, { useState, useEffect } from "react";
import Cookies from "js-cookies";
import { useNavigate, Link } from "react-router-dom";
import useUserInfoFromToken from "../../hooks/userinfo";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const user = useUserInfoFromToken();

  const navigate = useNavigate();

  useEffect(() => {
    // Check for the presence of a token when the component mounts
    if (Cookies.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array ensures this effect runs once

  const handleDashboard = () => {
    navigate(`/dashboard/${user.userId}/myvideos`);
  };

  return (
    <>
      <nav className="bg-[#282828] w-full flex flex-row justify-between items-center fixed top-0 left-0 z-10 px-4 md:px-6 lg:px-10 py-4 border-b border-[#3E3E3E]">
        <div className="flex justify-center items-center gap-2">
          {isLoggedIn && (
            <button
              id="menu"
              className="block md:hidden lg:hidden"
              onClick={() => setIsOpen(true)}
            >
              <Menu />
            </button>
          )}
          <div id="logo" className="font-syne font-bold text-2xl text-red-600">
            <Link to="/">Vitube</Link>
          </div>
        </div>
        <div id="auth-button" className="font-opensans font-medium text-base">
          {isLoggedIn ? (
            // Render "Dashboard" button when logged in
            <button
              className="py-3 px-4 rounded-sm text-sm bg-red-500 text-white"
              onClick={handleDashboard}
            >
              Dashboard
            </button>
          ) : (
            // Render "Log In" and "Sign Up" buttons when not logged in
            <>
              <button
                className="py-3 px-4 rounded-sm text-sm mr-2 hover:bg-[#3e3e3e]/60"
                onClick={(e) => navigate("/login")}
              >
                Log In
              </button>
              <button
                className="bg-red-500 py-3 px-4 rounded-sm text-sm"
                onClick={(e) => navigate("/register")}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>
      <Sidebar
        profile={user.profile}
        name={user.name}
        username={user.username}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        visible="hidden"
      />
    </>
  );
};

export default Navbar;

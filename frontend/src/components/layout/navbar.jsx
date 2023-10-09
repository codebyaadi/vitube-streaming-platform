import React, { useState, useEffect } from "react";
import SignUp from "../auth/signup";
import LogIn from "../auth/login";
import Cookies from "js-cookies";
import { useNavigate, Link } from "react-router-dom"
import useUserInfoFromToken from "../../hooks/userinfo";

const Navbar = () => {
  const [signUpToggle, setSignUpToggle] = useState(false);
  const [logInToggle, setLogInToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user = useUserInfoFromToken();

  const navigate = useNavigate();

  useEffect(() => {
    // Check for the presence of a token when the component mounts
    if (Cookies.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array ensures this effect runs once

  const handleDashboard = () => {
    navigate(`/dashboard/${user.userId}`)
  }

  return (
    <>
      <nav className="bg-[#282828] w-full flex flex-row justify-between items-center fixed top-0 left-0 z-10 px-10 py-4 border-b border-[#3E3E3E]">
        <div id="logo" className="font-syne font-bold text-2xl text-red-600">
          <Link to="/">Vitube</Link>
        </div>
        <div id="auth-button" className="font-opensans font-medium text-base">
          {isLoggedIn ? (
            // Render "Log Out" button when logged in
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
                className="border-[#3E3E3E] border py-3 px-4 rounded-sm text-sm mr-2"
                onClick={(e) => setLogInToggle(true)}
              >
                Log In
              </button>
              <button
                className="border-[#3E3E3E] border py-3 px-4 rounded-sm text-sm"
                onClick={(e) => setSignUpToggle(true)}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>
      {signUpToggle && <SignUp setSignUpToggle={setSignUpToggle} />}
      {logInToggle && <LogIn setLogInToggle={setLogInToggle} />}
    </>
  );
};

export default Navbar;

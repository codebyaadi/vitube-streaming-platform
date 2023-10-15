import React, { useState } from 'react';
import { Eye, EyeOff, X, AlertCircle } from "lucide-react";
import Cookies from 'js-cookies';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import api from '../../api/base/config';

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post('/login', userData);
      console.log(response);

      if (response.status === 200) {
        const { token } = response.data;
        Cookies.setItem('token', token, { expires: 1 / 24 });
        const tokenvalue = Cookies.getItem('token');
        console.log("Cookies", tokenvalue, { secure: true, sameSite: "None" })
        const decodedToken = jwt_decode(tokenvalue);
        console.log(decodedToken.userId)
        // Login was successful, you can perform any necessary actions here
        console.log('Login successful');

        navigate(`/dashboard/${decodedToken.userId}`)
        window.location.reload();
      } else {
        // Handle other success cases or provide error messages
        console.log('Login failed');
      }
    } catch (error) {
      // Handle the error by displaying an error message to the user
      console.error('Error:', error.response?.data || error.message);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" w-full h-full px-2 md:px-0 lg:px-0">
      <div className="w-[22rem] md:w-1/2 lg:w-1/3 absolute bg-[#282828] border border-[#3E3E3E] left-1/2 transform -translate-x-1/2 py-6 md:py-8 lg:py-16 px-8 rounded-sm flex flex-col gap-2 font-prompt">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-xl font-semibold">Log In</h1>
            <h3 className="text-sm font-medium">
              Log In to your account
            </h3>
            {error && <span className="flex justify-center items-center gap-2 text-red-500"><AlertCircle className="w-5 h-5" /> {error}</span>}
          </div>
          <div className="w-full">
            <div className="relative w-full flex flex-col items-start mt-2">
              <label className="text-sm" htmlFor="email">
                Email
              </label>
              <input
                className="w-full text-sm px-2 py-2.5 mt-2 rounded border border-[#3E3E3E] bg-[#1F1F1F] focus:outline-none"
                placeholder="Enter your email"
                type="email"
                name="email"
                id="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </div>
            <div className="relative w-full flex flex-col items-start mt-2">
              <label className="text-sm" htmlFor="password">
                Password
              </label>
              <input
                className="w-full text-sm px-2 py-2.5 mt-2 rounded border border-[#3E3E3E] bg-[#1F1F1F] focus:outline-none"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
              <button type="button" className="absolute top-1/2 right-4 transform translate-y-1" onClick={handleTogglePassword}>
                {showPassword ? (
                  <Eye className="w-5 h-5 text-slate-400" />
                ) : (
                  <EyeOff className="w-5 h-5 text-slate-400" />
                )}
              </button>
            </div>
            <div className="bg-red-500 flex text-white font-normal  justify-center items-center w-full text-sm px-2 py-2.5 mt-4 rounded-sm">
              <button className="w-full" type="submit">
                {isLoading ? "Logging..." : "Log In"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogIn;

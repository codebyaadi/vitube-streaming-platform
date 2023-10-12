import React, { useState } from "react";
import { Eye, EyeOff, X, AlertCircle } from "lucide-react";
import api from "../../api/base/config";
import OtpVerify from "./otp-verify";

const SignUp = ({ setSignUpToggle }) => {
  const [otpToggle, setOtpToggle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/signup", formData);

      if (response.status === 201) {
        // Signup was successful, you can perform any necessary actions here
        console.log("Signup successful");
        sessionStorage.setItem("email", formData.email);
        setOtpToggle(true);
      } else {
        // Handle signup failure, e.g., display an error message to the user
        console.error("Signup failed", error.response);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError(error.response?.data.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(otpToggle);

  return (
    <div>
      {otpToggle ? (
        <OtpVerify setOtpToggle={setOtpToggle} />
      ) : (
        <div className="fixed bg-black/60 w-full h-full z-20 left-0 top-0 px-2 md:px-0 lg:px-0">
          <div className="w-[22rem] md:w-1/2 lg:w-1/3 absolute bg-[#282828] border border-[#3E3E3E] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-6 md:py-8 lg:py-16 px-8 rounded-sm flex flex-col gap-2 font-prompt">
            <button
              className="absolute top-0 right-0 m-4"
              onClick={(e) => setSignUpToggle(false)}
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-start gap-2">
                <h1 className="text-xl font-semibold">Create an account</h1>
                <h3 className="text-sm font-medium">
                  Join the best video Streaming Community!
                </h3>
                {error && (
                  <span className="flex justify-center items-center gap-2 text-red-500">
                    <AlertCircle className="w-5 h-5" /> {error}
                  </span>
                )}
              </div>
              <div className="w-full">
                <div className="w-full flex flex-col items-start mt-2">
                  <label className="text-sm" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    className="w-full text-sm px-2 py-2.5 mt-2 rounded border border-[#3E3E3E] bg-[#1F1F1F] focus:outline-none"
                    placeholder="Ex. John"
                    type="text"
                    name="fullName"
                    id="fullName"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full flex flex-col items-start mt-2">
                  <label className="text-sm" htmlFor="username">
                    Username
                  </label>
                  <input
                    className="w-full text-sm px-2 py-2.5 mt-2 rounded border border-[#3E3E3E] bg-[#1F1F1F] focus:outline-none"
                    placeholder="Ex. johndoe"
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full flex flex-col items-start mt-2">
                  <label className="text-sm" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full text-sm px-2 py-2.5 mt-2 rounded border border-[#3E3E3E] bg-[#1F1F1F] focus:outline-none"
                    placeholder="Ex. johndoe@mail.com"
                    type="text"
                    name="email"
                    id="email"
                    onChange={handleChange}
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
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-4 transform translate-y-1"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? (
                      <Eye className="w-5 h-5 text-slate-400" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                </div>
                <div className="bg-red-500 flex text-white font-normal  justify-center items-center w-full text-sm px-2 py-2.5 mt-4 rounded-sm">
                  <button className="w-full" type="submit">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;

import React, { useState } from "react";
import { Eye, EyeOff, X, AlertCircle } from "lucide-react";
import api from "../../api/base/config";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      await api.post("/signup", formData);
        console.log("Signup successful");
        sessionStorage.setItem("email", formData.email);
        // Uncomment below line in for OTP Verification
        // navigate("/verify-otp")
        navigate("/"); // Comment this line after uncommenting above line
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError(error.response?.data.message);
      toast.error(error.response?.data.message)
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
        <div className="w-full h-full flex justify-center px-2 md:px-0 lg:px-0">
          <div className="w-[22rem] md:w-1/2 lg:w-1/3 bg-[#282828] border border-[#3E3E3E] py-6 md:py-8 lg:py-16 px-8 rounded-sm flex flex-col gap-2 font-prompt">
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
                    {isLoading ? "Registering..." : "Sign UP"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
  );
};

export default SignUp;

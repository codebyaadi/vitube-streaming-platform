import { X, AlertCircle } from "lucide-react";
import { useState } from "react";
import api from "../../api/base/config";

const OtpVerify = ({ setOtpToggle }) => {
  const [error, setError] = useState();
  const [msg, setMsg] = useState();
  const [isVerified, setIsVerified] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState();
  const email = sessionStorage.getItem("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit clicked");
    try {
      const response = await api.post("/verify-email", { email, enteredOtp });

      if (response.status === 200) {
        setMsg(response.data.message);
        console.log("Client", response.data.message);
        setIsVerified(true);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError(error.response?.data.message);
    }
  };

  return (
    <div className="fixed bg-black/60 w-full h-full z-20 left-0 top-0">
      <div className="w-[22rem] md:w-1/2 lg:w-1/3 absolute bg-[#282828] border border-[#3E3E3E] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-6 md:py-8 lg:py-16 px-8 rounded-sm flex flex-col gap-2 font-prompt">
        <button
          className="absolute top-0 right-0 m-4"
          onClick={() => setOtpToggle(false)}
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>
        {isVerified ? (
          <div className="flex justify-center items-center">{msg}</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-xl font-semibold">Verify OTP</h1>
              <h3 className="text-sm font-medium">
                {`Email is send to ${email}`}
              </h3>
              {error && (
                <span className="flex justify-center items-center gap-2 text-red-500">
                  <AlertCircle className="w-5 h-5" /> {error}
                </span>
              )}
            </div>
            <div className="w-full">
              <div className="w-full flex flex-col items-start mt-2">
                <label className="text-sm" htmlFor="OTP">
                  Enter OTP
                </label>
                <input
                  className="w-full text-sm px-2 py-2.5 mt-2 rounded border border-[#3E3E3E] bg-[#1F1F1F] focus:outline-none"
                  type="text"
                  name="OTP"
                  id="OTP"
                  onChange={(e) => setEnteredOtp(e.target.value)}
                />
              </div>
              <div className="bg-red-500 flex text-white font-normal  justify-center items-center w-full text-sm px-2 py-2.5 mt-4 rounded-sm">
                <button className="w-full" type="submit">
                  Verify
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default OtpVerify;

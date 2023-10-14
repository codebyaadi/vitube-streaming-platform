import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/navbar";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/auth/protectedroute";
import VideoPage from "./pages/video-page";
import OtpVerify from "./components/auth/otp-verify";
import SignUp from "./components/auth/signup";
import LogIn from "./components/auth/login";
import HomeSkeleton from "./components/loading/HomeSkeleton";

function App() {
  return (
    <div className="mt-[4.5rem] md:mt-16 lg:mt-20">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skeleton" element={<HomeSkeleton />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          <Route path="/video/:videoId" element={<VideoPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/:userId/*" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

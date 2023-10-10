import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from './components/layout/navbar';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import ProtectedRoute from './components/auth/protectedroute';
import VideoPage from './pages/video-page';

function App() {

  return (
    <div className="mt-24">
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/video/:videoId' element={<VideoPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard/:userId/*' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App

import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from './components/layout/navbar';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import ProtectedRoute from './components/auth/protectedroute';

function App() {

  return (
    <div>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard/:userId/*' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App

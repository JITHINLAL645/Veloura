import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/User/Home";
import About from "../pages/User/About";

import Signup from "../pages/User/Signup";
import Login from "../pages/User/Login";
import Otp from "../pages/User/Otp";

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/User/Home";
import About from "../pages/User/About";

import Signup from "../pages/User/Signup";
import Login from "../pages/User/Login";
import Otp from "../pages/User/Otp";
import Profile from "../pages/User/Profile";
import Shop from "../pages/User/Shop";
import Cart from "../pages/User/Cart";
import Wishlist from "../pages/User/Wishlist";

import AdminLayout from "../layout/AdminLayout";

import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminUsers from "../pages/Admin/AdminUsers";
import Products from "../pages/Admin/Adminproducts";
import ProductSingle from "../pages/User/ProductSingle";

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/otp" element={<Otp />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
        <Route path="/adminUsers" element={<AdminUsers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductSingle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;

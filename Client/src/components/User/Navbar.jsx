import {
  Heart,
  Menu,
  ShoppingCart,
  User,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import navbarLogo from "../../assets/navbarlogo7.png";

import ProfileDropdown from "./ProfileDropdown";

function Navbar() {
  const navigate = useNavigate();

  // LOGIN STATE
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // DROPDOWN STATE
  const [showDropdown, setShowDropdown] = useState(false);

  // REF
  const dropdownRef = useRef();

  // CHECK LOGIN
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // CLOSE DROPDOWN WHEN CLICK OUTSIDE
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");

    setIsLoggedIn(false);

    setShowDropdown(false);

    navigate("/login");
  };

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">

      <div className="w-full px-6 md:px-14 py-5 flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-12">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">

            <img
              src={navbarLogo}
              alt="Dress Logo"
              className="w-14 h-14 object-contain"
            />

            <div>
              <h1
                className="text-4xl md:text-5xl text-[#e5a93b] font-normal tracking-wide leading-none"
                style={{ fontFamily: "'Brush Script MT', cursive" }}
              >
                Veloura
              </h1>
            </div>

          </Link>

          {/* NAV LINKS */}
          <ul className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-gray-700">

            {/* HOME */}
            <li className="relative group transition-all duration-300">

              <Link to="/" className="cursor-pointer">
                Home
              </Link>

              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#e5a93b] transition-all duration-300 group-hover:w-full"></span>

            </li>

            {/* SHOP */}
            <li className="relative group transition-all duration-300">

              <Link to="/shop" className="cursor-pointer">
                Shop
              </Link>

              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#e5a93b] transition-all duration-300 group-hover:w-full"></span>

            </li>

            {/* ABOUT */}
            <li className="relative group transition-all duration-300">

              <Link to="/about" className="cursor-pointer">
                About
              </Link>

              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#e5a93b] transition-all duration-300 group-hover:w-full"></span>

            </li>

          </ul>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 relative">

          {/* WISHLIST */}
          <button className="hidden md:flex w-11 h-11 items-center justify-center rounded-full hover:bg-gray-100 transition">

            <Heart size={19} className="text-gray-700" />

          </button>

          {/* CART */}
          <button className="hidden md:flex w-11 h-11 items-center justify-center rounded-full hover:bg-gray-100 transition relative">

            <ShoppingCart size={19} className="text-gray-700" />

          </button>

          {/* IF USER NOT LOGGED IN */}
          {!isLoggedIn ? (
            <>
              {/* SIGN IN */}
              <Link
                to="/login"
                className="hidden md:flex items-center justify-center px-4 py-2 rounded-full hover:bg-gray-100 text-gray-800 hover:text-black transition text-sm font-medium"
              >
                Sign in
              </Link>

              {/* SIGN UP */}
              <Link
                to="/signup"
                className="bg-[#e5a93b] hover:bg-[#d89b2d] text-black px-6 py-3 rounded-full transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              {/* PROFILE BUTTON */}
              <div className="relative" ref={dropdownRef}>

                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-12 h-12 rounded-full bg-[#f6e3ba] hover:bg-[#eed29a] flex items-center justify-center transition-all duration-300 shadow-md"
                >
                  <User size={20} className="text-black" />
                </button>

                {/* DROPDOWN */}
                <ProfileDropdown
                  isOpen={showDropdown}
                  onLogout={handleLogout}
                />

              </div>
            </>
          )}

          {/* MOBILE MENU */}
          <button className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full hover:bg-gray-100 transition">

            <Menu size={21} />

          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
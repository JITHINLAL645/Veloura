import navbarLogo from "../../assets/navbarlogo7.png";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Mail, MessageCircle } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full bg-[#111111] text-white pt-16 pb-8 px-6 md:px-14">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 border-b border-gray-800 pb-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 cursor-pointer mb-5">
            <img
              src={navbarLogo}
              alt="Veloura Logo"
              className="w-14 h-14 object-contain"
            />

            <h1
              className="text-4xl text-[#e5a93b] font-normal tracking-wide leading-none"
              style={{ fontFamily: "'Brush Script MT', cursive" }}
            >
              Veloura
            </h1>
          </div>

          <p className="text-gray-400 text-sm leading-7">
            Luxury fashion crafted for timeless elegance and modern style.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-5 text-[#e5a93b]">
            Contact Us
          </h2>

          <div className="flex flex-col gap-4 text-gray-300">
            <div className="flex items-center gap-2 hover:text-white cursor-pointer transition">
              <Mail size={18} />
              <span className="text-sm">Email Us</span>
            </div>

            <div className="flex items-center gap-2 hover:text-white cursor-pointer transition">
              <MessageCircle size={18} />
              <span className="text-sm">Text Us</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-5 text-[#e5a93b]">
            For Customers
          </h2>

          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="hover:text-white cursor-pointer transition">
              Account
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Size Guide
            </li>
            <li className="hover:text-white cursor-pointer transition">FAQ</li>
            <li className="hover:text-white cursor-pointer transition">
              Stores
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Shipping + Returns
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-5 text-[#e5a93b]">
            Our Company
          </h2>

          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="hover:text-white cursor-pointer transition">
              About Us
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Responsibility
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Wholesale
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Terms of Use
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Accessibility
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-5 text-[#e5a93b]">
            Follow Us
          </h2>

          <div className="flex items-center gap-5 text-gray-300">
            <FaInstagram
              size={22}
              className="hover:text-white cursor-pointer transition"
            />

            <FaFacebook
              size={22}
              className="hover:text-white cursor-pointer transition"
            />

            <FaXTwitter
              size={22}
              className="hover:text-white cursor-pointer transition"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between pt-6 text-gray-500 text-sm">
        <p>© 2026 Veloura. All rights reserved.</p>
        <p className="mt-3 md:mt-0">Designed with elegance & luxury.</p>
      </div>
    </footer>
  );
}

export default Footer;
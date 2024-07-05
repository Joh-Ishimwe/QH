import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
// import Darkmode from "./Pages/Darkmode";

const Menu = ({ isOpen, toggleMenu }) => {
  return (
    <ul
      id="mobileNav"
      className={`absolute flex flex-col space-y-2 bg-[#a5bbd3] text-white top-16 left-0 w-full ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <li>
        <a href="/" className="block py-2 px-4">
          Home
        </a>
      </li>
      <li>
        <a href="/about" className="block py-2 px-4">
          About
        </a>
      </li>
      <li>
        <a href="/employee" className="block py-2 px-4">
          Employee
        </a>
      </li>
      <li>
        <a href="/contact" className="block py-2 px-4">
          Contact
        </a>
      </li>
      <li>
        <button
          className="bg-white rounded-full hover:bg-[#893470] block py-2 px-4 hover:text-white text-[#bf5084]"
          onClick={toggleMenu}
        >
          <a href="/signin" className="flex items-center py-2 px-4">
            Sign in
          </a>
        </button>
      </li>
    </ul>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="fixed bg-white drop-shadow-lg text-[#a5bbd3] top-0 left-0 w-full text-grey-500 p-4 flex justify-around items-center z-40">
        <div className="flex items-center">
        <div class="text-5xl text-[#0b1957] font-semibold animate-bounce">Q~H</div>
        </div>
        <ul className="hidden md:flex space-x-4">
          <li>
            <a href="/" className="flex items-center py-2 px-4">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="flex items-center py-2 px-4">
              About
            </a>
          </li>
          <li>
            <a href="/employee" className="flex items-center py-2 px-4">
              Employee
            </a>
          </li>
          <li>
            <a href="/contact" className="flex items-center py-2 px-4">
              Contact
            </a>
          </li>
          <li>
            <a
              href="/signin"
              className="flex items-center py-2 hover:text-2xl hover:text-[#afa3d5] px-4"
            >
              Sign in
            </a>
          </li>
          <li className={`isDarkMode ? 'dark' : 'light' flex items-center`}>
            {/* <Darkmode /> */}
          </li>
        </ul>
        <div className="md:hidden">
          <button
            id="menuToggle"
            className="text-gray-400 focus:outline-none bold text-2xl"
            onClick={toggleMenu}
          >
            <CiMenuFries />
          </button>
        </div>
        <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>
    </div>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiMenuFries } from "react-icons/ci";

const Menu = ({ isOpen, toggleMenu, isSignedIn, user, handleSignOut }) => {
  return (
    <ul
      id="mobileNav"
      className={`absolute flex flex-col space-y-2 bg-[#a5bbd3] text-white top-16 left-0 w-full ${isOpen ? "block" : "hidden"
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
        {isSignedIn ? (
          <button
            className="bg-white rounded-full hover:bg-[#893470] block py-2 px-4 hover:text-white text-[#bf5084]"
            onClick={() => {
              handleSignOut();
              toggleMenu();
            }}
          >
            <a href="/" className="flex items-center py-2 px-4">
              Sign out
            </a>
          </button>
        ) : (
          <a
            href="/signin"
            className="bg-white rounded-full hover:bg-[#893470] block py-2 px-4 hover:text-white text-[#bf5084]"
            onClick={toggleMenu}
          >
            Sign in
          </a>
        )}
      </li>
    </ul>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUser(null);
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.get("https://qh-backend.onrender.com/api/v1/employee/getById", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userData = response.data.data;
      setIsSignedIn(true);
      setUser(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSignIn();
  }, []);

  return (
    <div>
      <div className="fixed bg-white drop-shadow-lg text-[#a5bbd3] top-0 left-0 w-full text-grey-500 p-4 flex justify-around items-center z-40">
        <div className="flex items-center">
          <div className="text-5xl text-[#0b1957] font-semibold animate-bounce">Q~H</div>
        </div>
        <ul className="hidden md:flex space-x-4 items-center">
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
            {isSignedIn ? (
              <button
                className="flex items-center py-2 hover:text-2xl hover:text-[#afa3d5] px-4"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            ) : (
              <a
                href="/signin"
                className="flex items-center py-2 hover:text-2xl hover:text-[#afa3d5] px-4"
              >
                Sign in
              </a>
            )}
          </li>
          {isSignedIn && user && (
            <li>
              <img
                src={user.profilePicture.url}
                alt="User Profile"
                className="w-8 h-8 rounded-full"
              />
            </li>
          )}
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
        <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} isSignedIn={isSignedIn} user={user} handleSignOut={handleSignOut} />
      </div>
    </div>
  );
};

export default Navbar;

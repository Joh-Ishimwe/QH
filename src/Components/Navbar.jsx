import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiMenuFries } from "react-icons/ci";
import { Navigate } from "react-router-dom";

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
          <>
          <button
            className="bg-white cursor-pointer   rounded-full hover:bg-[#893470] block py-2 px-4 hover:text-white text-[#bf5084]"
            onClick={() => {
              handleSignOut();
              toggleMenu();
            }}
          >
            sign out 
          </button>

            <a href="/register" className="flex items-center py-2 px-4 ">
              profile 
            </a> 
          </>
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

  useEffect(() => {

    const checkAuthStatus = ()=>{
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token) {
        setIsSignedIn(true);
        setUser(JSON.parse(localStorage.getItem('user')));
      } else{
        setIsSignedIn(false);
        setUser(null); 
      }

    };
    checkAuthStatus();
    // add event listener to check auth status and when  storage changes

    window.addEventListener('storage', checkAuthStatus); 

    // clean up  the event listener 

    return () =>{
      window.removeEventListener('storage', checkAuthStatus);
    }

    console.log("logedIn")
  }, []);  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    localStorage.removeItem("token");
    setUser(null);
  };



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
              <div className=" flex ga-2 item-center "  >
              <button
                className="flex items-center py-2 hover:text-2xl hover:text-[#afa3d5] px-4"
                onClick={handleSignOut}
              >
                Sign out
              </button>
             
              </div >
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
            <a href="/register">   <img
                // src={user.profilePicture.url}
                alt="User Profile"
                className="w-1o h-10 rounded-full cursor-pointer "
              /></a>
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

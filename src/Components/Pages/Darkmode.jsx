import React, { useState, useEffect } from "react";
import { IoIosSunny } from "react-icons/io";
import { IoIosMoon } from "react-icons/io";

const Darkmode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load initial theme preference from local storage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    setIsDarkMode(savedMode === "true");
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    localStorage.setItem("darkMode", newMode);
    setIsDarkMode(newMode);
  };

  return (
    <div className="md:flex space-x-4">
      <input
        type="checkbox"
        id="darkModeToggle"
        checked={isDarkMode}
        onChange={toggleDarkMode}
        className="hidden"
      />
      <label htmlFor="darkModeToggle" className="cursor-pointer">
        <div className="w-12 h-7 bg-gray-100 rounded-full  flex items-center">
          <div
            className={`w-4 h-4 rounded-full shadow-md transform transition-transform ${
              isDarkMode ? "translate-x-6 mb-2  " : "translate-x-0 mb-2"
            }`}
          >
            {isDarkMode ? (
              <IoIosMoon className="text-black flex justify-center w-6 h-6 rounded-full " />
            ) : (
              <IoIosSunny className="text-yellow-400 flex justify-center w-6 h-6" />
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default Darkmode;

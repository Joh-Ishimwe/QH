import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    setError("");

    if (!userName.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!email.includes("@gmail.com")) {
      setError("Email must be a valid Gmail address.");
      return;
    }

    if (password.length < 7) {
      setError("Password must be at least 7 characters long.");
      return;
    }

    try {
      const response = await axios.post(
        "https://quickhelp-2.onrender.com/api/v1/auth/register/",
        {
          userName: userName,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      navigate("/Confirm");
    } catch (error) {
      console.error(error);
      setError("An error occurred during signup. Please try again.");
    }
  };

  return (
    <main className="bg-gray-50  min-h-screen flex items-center justify-center  mx-auto max-w-full-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-xl lg:max-w-3xl">
        <h1 className="text-center text-2xl bold text-blue-400 sm:text-3xl">
          Quick Help
        </h1>
        <form
          onSubmit={handleSignUp}
          className="bg-white mt-8 grid grid-cols-6 gap-6 mb-2 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <div className="col-span-6">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="col-span-6">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="email"
              className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="col-span-6">
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="Password"
                name="password"
                className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-4 py-1 text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
          </div>

          {error && <p className="col-span-6 text-red-500 text-sm">{error}</p>}

          <div className="col-span-6">
            <label
              htmlFor="MarketingAccept"
              className="flex gap-4 items-center"
            >
              <input
                type="checkbox"
                id="MarketingAccept"
                name="marketing_accept"
                className="rounded-md border-gray-200 bg-white shadow-sm"
              />
              <span className="text-sm text-gray-700">
                I want to receive emails about events.
              </span>
            </label>
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              type="submit"
              className={`block w-full rounded-lg bg-blue-300 px-5 py-3 text-sm font-medium text-white mt-2 ${
                error ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={error !== ""}
            >
              Create account
            </button>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?{" "}
              <a href="/ " className="text-gray-700 underline">
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;

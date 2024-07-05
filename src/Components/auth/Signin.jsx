// Components/auth/Signin.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const isAdmin = false;

  const handleSignin = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError('Please fill in both email and password.');
      return;
    }

    if (!trimmedEmail.includes('@gmail.com') && !trimmedEmail.includes('@net.com')) {
      setError('Email must be a valid Gmail or Net address.');
      return;
    }

    if (trimmedPassword.length < 7) {
      setError('Password must be at least 7 characters long.');
      return;
    }

    setError('');

    try {
      const response = await axios.post('https://quickhelp-2.onrender.com/api/v1/auth/login', {
        email: email,
        password: password
      }, {
        headers: {
          "Content-Type": 'application/json',
        },
      });

      console.log("API Response:", response.data); 

      const { user, token } = response.data;
      console.log("Tokendsxfcgvhbjnkmljhgfvtdrszdrxfctgyuhokpl:", token); 
    
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data.Role))


      if (user.Role === 'Admin') {
        login(user);
        navigate('/dashboard');
      } else {

        login(user);
        navigate('/');
      }

    } catch (error) {
      setError('Invalid credentials');
      console.error(error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(""); 
  };

  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center mx-auto max-w-full-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl bold text-blue-400 sm:text-3xl">
          Quick Help
        </h1>
        <form
          onSubmit={handleSignin}
          className="bg-white mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-pink-500 text-lg font-medium">
            Sign in
          </p>

          <div className="relative">
            <input
              type="email"
              className="bg-white w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
              placeholder="Email"
              value={isAdmin ? "admin@gmail.com" : email} 
              onChange={handleEmailChange}
            />
          </div>

          <div className="relative">
            <input
              type="password"
              className="bg-white w-full rounded-lg border-gray-200 p-4 pe-12 text-sm text-blue-400 shadow-sm"
              placeholder="Password"
              value={isAdmin ? "admin123" : password} 
              onChange={handlePasswordChange}
            />
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <button
            type="submit"
            className={`block w-full rounded-lg bg-blue-300 px-5 py-3 text-sm font-medium text-white mt-2 ${
              error ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={error !== ""}
          >
            Sign in
          </button>

          <p className="text-blue-500 text-center text-sm">
            No account?
            <a href="/signup" className="underline"> Sign up </a>
          </p>

          <p className="text-center mt-2">
            <a href="/setnew" className="text-blue-500"> Forgot Password? </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;

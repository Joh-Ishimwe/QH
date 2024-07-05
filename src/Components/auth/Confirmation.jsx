import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Confirmation = () => {
  const [confirmationCode, setConfirmationCode] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate(); 

  const handleConfirmation = (e) => {
    e.preventDefault();

    const otp = confirmationCode.join("");

    if (otp.trim().length < 6) {
      setError("Please enter the complete confirmation code.");
      return;
    }

    setError("");

    const email = "example@example.com"; 

    axios
      .post(
        "https://quickhelp-2.onrender.com/api/v1/auth/verify",
        {
          email: email,
          otp: otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        setError("Verification failed. Please try again.");
      });
  };

  const handleConfirmationCodeChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) { 
      const newCode = [...confirmationCode];
      newCode[index] = value;
      setConfirmationCode(newCode);
      setError("");


      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (confirmationCode[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      } else {
        const newCode = [...confirmationCode];
        newCode[index] = "";
        setConfirmationCode(newCode);
      }
    }
  };

  return (
    <div className="bg-[#fafafa] mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl text-blue-400 sm:text-2xl">
          Quick help
        </h1>
        <form
          onSubmit={handleConfirmation}
          className="bg-white mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-pink-500 text-lg font-medium">
            Enter Confirmation Code
          </p>

          <div className="grid grid-cols-6 gap-2 mt-4">
            {confirmationCode.map((_, index) => (
              <div key={index} className="relative">
                <input
                  type="text"
                  maxLength={1}
                  className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black text-center text-sm shadow-sm"
                  onChange={(e) => handleConfirmationCodeChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  value={confirmationCode[index]}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              </div>
            ))}
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <button
            type="submit"
            className="block w-full rounded-lg bg-blue-300 px-5 py-3 text-sm font-medium text-white"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Confirmation;

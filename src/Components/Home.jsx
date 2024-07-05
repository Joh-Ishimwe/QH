import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import About from "./About";
import Employee from "./Employee";
import Contact from "./Contact";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const TypingAnimation = ({ words }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(type, 200);
    return () => clearTimeout(timeout);
  }, [letterIndex, currentWord, isDeleting]);

  function type() {
    const word = words[currentWordIndex];

    if (!isDeleting && letterIndex <= word.length) {
      setCurrentWord(word.substring(0, letterIndex + 1));
      setLetterIndex(letterIndex + 1);
    } else if (isDeleting && letterIndex >= 0) {
      setCurrentWord(word.substring(0, letterIndex - 1));
      setLetterIndex(letterIndex - 1);
    } else {
      setIsDeleting(!isDeleting);
      if (!isDeleting) {
        setCurrentWordIndex((currentWordIndex + 1) % words.length);
      }
    }
  }

  return <span className='text-[#5884e7]'>{currentWord}</span>;
};

const Home = () => {
  const words = ["Quick help"];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex flex-col items-center justify-center p-5"
      >
        <div className="relative mt-5 py-16 lg:py-0 lg:flex lg:h-screen lg:items-center lg:justify-between max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="home-info text-center md:text-left flex flex-col justify-center lg:pr-12"
          >
            <h3 className="hello text-4xl font-bold mb-4">
              Find the Best Freelancer 
            </h3>
            <h3 className="my-profession text-4xl font-bold mb-4 ">
              with <TypingAnimation  words={words} />
            </h3>
            <p className="text-gray-700 text-xl">
              Discover reliable home assistance with Quick help! Hire skilled
              professionals for all your household needs. Join now and
              experience convenience at your doorstep. Quick service, sparkling
              results.
            </p>
            <div className="flex mt-4 justify-center sm:justify-start text-xl">
              <ul className="m-10 flex flex-wrap justify-center gap-6 md:gap-8 text-3xl">
                <li>
                  <a
                    className="text-[#a5bbd3] transition hover:text-blue-600/75"
                    href="https://facebook.com"
                  >
                    <FaFacebook size={40} />
                  </a>
                </li>

                <li>
                  <a
                    className="text-[#a5bbd3] transition hover:text-blue-400/75 "
                    href="https://twitter.com"
                  >
                    <FaTwitter size={40} />
                  </a>
                </li>

                <li>
                  <a
                    className="text-[#a5bbd3] transition hover:text-red-600/75"
                    href="mailto:your-email@example.com"
                  >
                    <MdEmail size={40} />
                  </a>
                </li>

                <li>
                  <a
                    className="text-[#a5bbd3] transition hover:text-pink-600/75"
                    href="https://instagram.com"
                  >
                    <FaInstagram size={40} />
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="lg:w-1/2 flex justify-center"
          >
            <img
              className="rounded-lg shadow-lg border h-100 lg:h-120 w-auto max-w-full object-cover"
              src="https://i.pinimg.com/564x/d8/39/66/d83966edf99f1d7e5322503ad4ff57f6.jpg"
              alt="Example Image"
            />
          </motion.div>
        </div>
      </motion.div>
      <About />
      <Employee />
      <Contact />
    </>
  );
};

export default Home;

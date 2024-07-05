import React from "react";
import { motion } from "framer-motion";
import { MdArrowOutward, MdCheck } from "react-icons/md";

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className=" min-h-screen max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 mt-7">
        <div className="relative mx-auto max-w-full px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-4">
          <div className="home-info text-center md:text-left flex-col">
            <h3 className="hello text-4xl font-bold mb-4 text-[#0b1957]">
              Find talent your way
            </h3>
            <p className="text-gray-700 mb-6">
              Don't get stuck at home cleaning. Work with the largest network of
              independent professionals and get things done—from quick
              turnarounds to big transformations.
            </p>

            <form action="https://formspree.io/f/xayrjbba" method="POST" className="bg-gray-100 mt-8  gap-6 mb-2 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
              <div className="mb-3">
                <label
                  htmlFor="fname"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="firstname"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  placeholder="Your name.."
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="lname"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lastname"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  placeholder="Your last name.."
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="country"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Location
                </label>
                <select
                  id="country"
                  name="country"
                  placeholder=""
                  className="border border-gray-300 rounded-lg p-2 w-full"
                >

                  <option value="rwanda"></option>
                  <option value="europe">Gasabo</option>
                  <option value="usa">Nyarugenge</option>
                  <option value="usa">Kicukiro</option>
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Subject
                </label>
                <textarea
                  id="subject"
                  name="subject"
                  className="border border-gray-300 rounded-lg p-2 w-full h-24"
                  placeholder="Write something.."
                ></textarea>
              </div>
              <button type ="submit" className="bg-[#0b1957] rounded-full hover:text-white text-white sm:px-6 mt-4">
                  Contact us
                  <MdArrowOutward className="ml-2" />
              </button>
            </form>
          </div>

          <section>
            <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2relative mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8 lg:py-0 lg:flex  lg:items-center lg:justify-between">
                <div className="relative flex items-center">
                  <div className="absolute bottom-0 left-0 z-10 bg-[#0b1957] text-gray-300 p-4 rounded-lg shadow-lg">
                    <ul>
                      <li className="flex items-center">
                        <MdCheck className="bg-[#0b1957] border rounded-full mr-2" />
                        The best for every budget
                      </li>
                      <li className="flex items-center">
                        <MdCheck className="bg-[#0b1957] border rounded-full mr-2" />
                        Quality work done quickly
                      </li>
                      <li className="flex items-center">
                        <MdCheck className="bg-[#0b1957] border rounded-full mr-2" />
                        Protected payments
                      </li>
                      <li className="flex items-center">
                        <MdCheck className="bg-[#0b1957] border rounded-full mr-2" />
                        24/7 support
                      </li>
                    </ul>
                  </div>

                  <img
                    className="rounded-lg shadow-lg border h-100 lg:h-120 w-auto max-w-full object-cover mt-10"
                    src="https://i.pinimg.com/564x/97/18/79/9718795e20700f295b35497a624a768a.jpg"
                    alt="Example Image"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;

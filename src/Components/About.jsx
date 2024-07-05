import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import axios from "axios";

const Number = ({ n }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
};

const About = () => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState({});

  const handleFetch = async () => {
    await axios({
      method: "get",
      url: "https://quickhelp-2.onrender.com/api/v1/jobs/getAll",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((Response) => {
        console.log(Response.data);
        setData(Response.data.jober);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleToggle = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="bg-[#fafafa] min-h-screen flex flex-col items-center justify-center p-5 text-gray-700 mt-7">
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-bold mb-4">About US</h2>
          <p className="text-xl">
            Quick Help was founded in 2024 with the mission of assisting
            families with their household tasks and connecting job seekers with
            those in need. We are committed to providing a seamless experience
            for our users.
          </p>
          <div className="flex justify-around text-2xl font-bold text-[#114a6e] mt-6">
            <div>
              <Number n={15} />
              <h4 className="text-gray-300 text-sm sm:text-xl">
                Total solopreneur
              </h4>
            </div>
            <div>
              <Number n={50} />
              <h4 className="text-gray-300 text-sm sm:text-xl">
                Orders Received
              </h4>
            </div>
            <div>
              <Number n={500} />
              <h4 className="text-gray-300 text-sm sm:text-xl">
                Positive Reviews
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <h3 className="font-bold text-3xl mb-6">Our Services :</h3>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((service, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow transition hover:shadow-lg"
            >
              <img
                src={service.Picture.url}
                alt={service.JobName}
                className="h-56 w-full object-cover"
              />
              <div className="bg-white p-4 sm:p6">
                <h2 className="mt-0.5 text-lg text-gray-900">
                  {service.JobName}
                </h2>
                <p className="text-gray-500 mt-2">
                  {expanded[index]
                    ? service.Description
                    : `${service.Description.slice(0, 100)}...`}
                </p>
                <button
                  onClick={() => handleToggle(index)}
                  className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                >
                  {expanded[index] ? "Show less" : "Find out more"}
                  <span
                    aria-hidden="true"
                    className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                  >
                    &rarr;
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;

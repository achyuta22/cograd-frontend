import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
              Your Ultimate Event Management Solution
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Seamlessly organize, manage, and promote your events with ease.
              Our platform provides the tools you need to create memorable
              experiences.
            </p>
            <button
              onClick={() => navigate("/addevent")}
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add an Event
            </button>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU9k0XUBDpB26teTjMlJuTxQNdLd0s3cfSSw&s"
              alt="Event Management"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

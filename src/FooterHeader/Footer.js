import React from "react";

const Footer = () => {
  return (
    <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a
            href="https://www.google.com/url?sa=i&url=https%3A%2F%2Flogo.com%2Flogos%2Fevent-planner-logo-generator&psig=AOvVaw3smx345U76QI0SzcNZGiCb&ust=1724341970452000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLDivM64hogDFQAAAAAdAAAAABAE"
            class="hover:underline"
          >
            Planner™
          </a>
          . All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";

const HomeFooter = () => {
  return (
    <div className="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
      <a className="text-gray-500 no-underline hover:no-underline" href="#">
        &copy; 2024
      </a>
      - TechTrail
      <a
        className="text-gray-500 no-underline hover:no-underline"
        href="https://www.tailwindtoolbox.com"
      >
        {""} BCM
      </a>
    </div>
  );
};

export default HomeFooter;

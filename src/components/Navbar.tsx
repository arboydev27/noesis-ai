import React from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";

const Navbar = () => {
  return (
    // <div className="p-10 md:px-20 lg:px-20 xl:px-40 flex flex-row items-center justify-between"> // Pushes content below it downwards
    <div className="absolute top-0 left-0 w-full p-6 px-10 md:px-15 lg:px-20 xl:px-25 flex flex-row items-center justify-between z-20">
      {" "}
      {/* Floats the navbar at the top and Ensures it stays above other things *}
      {/* LOGO */}
      <div className="text-2xl lg:text-3xl xl:text-4xl font-black bg-gradient-to-r from-[#130261] to-[#9747FF] bg-clip-text text-transparent">
        Noesis
      </div>
      {/* SIDE BAR OPENER */}
      <div>
        <Bars3Icon className="w-7 h-7 fill-[#130261] " />
      </div>
    </div>
  );
};

export default Navbar;

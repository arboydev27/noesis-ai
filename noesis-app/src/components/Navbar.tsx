import React from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { LuAlignStartVertical } from "react-icons/lu";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  return (
    // <div className="p-10 md:px-20 lg:px-20 xl:px-40 flex flex-row items-center justify-between"> // Pushes content below it downwards
    <div className="absolute top-0 left-0 w-full p-3 md:p-5 px-10 md:px-15 lg:px-20 xl:px-25 flex flex-row items-center justify-between z-20 bg-white/20 text-[#130261] backdrop-blur-md shadow-md ring-1 ring-white/30 hover:bg-white/30 transition-all">
      {" "}
      {/* Floats the navbar at the top and Ensures it stays above other things *}
      {/* LOGO */}
      <div className="text-2xl lg:text-3xl xl:text-4xl font-black bg-gradient-to-r from-[#130261] to-[#9747FF] bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out">
        Noesis
      </div>
      {/* SIDE BAR OPENER */}
      <div>
        <LuAlignStartVertical
          className="w-6 h-6 text-[#130261] cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
          onClick={toggleSidebar}
        />
      </div>
    </div>
  );
};

export default Navbar;

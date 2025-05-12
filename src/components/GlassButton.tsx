"use client";

import React from "react";
import { ReactNode } from "react";

interface GlassButtonProps {
  icon: ReactNode;
  children: ReactNode;
}

const GlassButton = ({ icon, children }: GlassButtonProps) => {
  const handleClick = () => {
    // Handle the button click event
    console.log("Button clicked");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 text-[#130261] backdrop-blur-md shadow-md ring-1 ring-white/30 hover:bg-white/30 transition-all"
    >
      {icon}
      <span> {children} </span>
    </button>
  );
};

export default GlassButton;

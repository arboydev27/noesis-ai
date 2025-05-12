import React from "react";
import Navbar from "@/components/Navbar";
import Home from "@/components/Home";

const Background = () => {
  return (
    <div className="fixed insert-0 overflow-hidden h-screen w-screen bg-linear-to-bl from-purple-200 from-5% via-purple-50 via-40% to-white to-90% z-0">
      <div className="absolute -top-[400px] -right-[400px] w-[1000px] h-[1000px] bg-[radial-gradient(circle,_#d0d1ff_0%,_transparent_70%)] pointer-events-none z-0" />
      <div className="absolute -bottom-[400px] -left-[400px] w-[1000px] h-[1000px] bg-[radial-gradient(circle,_#d0d1ff_0%,_transparent_70%)] pointer-events-none z-0" />
      <div className="relative z-10">
        <Navbar />
        <Home />
      </div>
    </div>
  );
};

export default Background;

// "use client";

// import React from "react";
// import Navbar from "@/components/Navbar";
// import Home from "@/components/Home";
// import { useState } from "react";

// const Background = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   return (
//     <div className="fixed insert-0 overflow-hidden h-screen w-screen bg-linear-to-bl from-purple-200 from-5% via-purple-50 via-40% to-white to-90% z-0">
//       <div className="absolute -top-[400px] -right-[400px] w-[1000px] h-[1000px] bg-[radial-gradient(circle,_#d0d1ff_0%,_transparent_70%)] pointer-events-none z-0" />
//       <div className="absolute -bottom-[400px] -left-[400px] w-[1000px] h-[1000px] bg-[radial-gradient(circle,_#d0d1ff_0%,_transparent_70%)] pointer-events-none z-0" />
//       <div className="relative z-10">
//         <Navbar toggleSidebar={toggleSidebar} />
//         <Home />
//       </div>
//     </div>
//   );
// };

// export default Background;

"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Home from "@/components/Home";

const Background = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="fixed inset-0 overflow-hidden h-screen w-screen bg-gradient-to-bl from-purple-200 via-purple-50 to-white z-0">
      {/* Glows */}
      <div className="absolute -top-[400px] -right-[400px] w-[1000px] h-[1000px] bg-[radial-gradient(circle,_#d0d1ff_0%,_transparent_70%)] pointer-events-none z-0" />
      <div className="absolute -bottom-[400px] -left-[400px] w-[1000px] h-[1000px] bg-[radial-gradient(circle,_#d0d1ff_0%,_transparent_70%)] pointer-events-none z-0" />

      {/* Sidebar: now inside this file */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 backdrop-blur-sm bg-white/10 z-20 transition-all"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content */}
      <div
        // ==========================================
        // lg:ml-80: applies the margin-left only on lg and up (1024px+)
        // On smaller screens, margin stays ml-0 → sidebar overlays the content
        // No need to manually detect screen size or write custom logic
        // =========================================
        className={`relative z-10 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-80" : ""
        }`}
      >
        <Navbar toggleSidebar={toggleSidebar} />
        <Home />
      </div>
    </div>
  );
};

export default Background;

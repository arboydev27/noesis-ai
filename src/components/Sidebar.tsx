"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CogIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import ChatItem from "@/components/ChatItem";
import { useState } from "react";

const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const [chats, setChats] = useState([
    "Brainstorm marketing ideas",
    "Summarize my meetings notes",
    "Creating a HTML based Game Engine",
    "Best vacation destinations for 2025",
    "How does ChatGPT work?",
    "Help me plan a trip",
    "Help me plan a trip",
    "Help me plan a trip",
    "Help me plan a trip",
    "Creating a HTML based Game Engine",
    "Best vacation destinations for 2025",
    "How does ChatGPT work?",
    "Help me plan a trip",
    "Help me plan a trip",
    "Help me plan a trip",
    "Help me plan a trip",
  ]);

  const handleDelete = (index: number) => {
    setChats(chats.filter((_, i) => i !== index));
  };

  return (
    <div
      // className={`fixed top-0 left-0 h-full w-64 mx-10 bg-white rounded-4xl shadow-md z-30 transform transition-transform duration-300 ${
      className={`fixed top-4 left-4 h-[calc(100%-2rem)] w-80 p-5 bg-[#E8E6ED] border border-[#441C9A] rounded-4xl z-30 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-[calc(100%+1rem)]"
      } shadow-2xl ring-1 ring-white/30 flex flex-col`}
    >
      {/* User Profile and Settings Div */}
      <div className="w-auto h-22 bg-white rounded-2xl p-4 flex flex-row items-center justify-between">
        {/* Icon and User Profile */}
        <div className="flex flex-row items-center gap-2">
          <UserCircleIcon
            className="w-8 h-8 text-[#441C9A] cursor-pointer hover:text-[#130261] transition"
            onClick={toggleSidebar}
          />
          <div className="text-black font-semibold">User Profile</div>
        </div>

        {/* Settings Icon */}
        <CogIcon
          className="w-8 h-8 text-[#441C9A] cursor-pointer hover:text-[#130261] transition"
          onClick={toggleSidebar}
        />
      </div>

      {/* BEGIN NEW CHAT and SEARCH BUTTON */}
      <div className="mt-2 flex flex-row gap-1">
        {/* BEGIN NEW CHAT BUTTON */}
        <button className="flex-grow h-14 rounded-full text-white text-sm bg-[#441C9A] hover:bg-[#130261] transition">
          Begin a New Chat
        </button>

        {/* SEARCH BUTTON */}
        <button className="h-14 w-14 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#130261] transition">
          {/* <MagnifyingGlassIcon className="w-5 h-5 text-[#130261] mt-2" />
            <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 rounded-full bg-gray-200 px-4 text-[#130261] placeholder-gray-400" bg-[#130261] bg-[#3a0ca3]
            /> */}
          <MagnifyingGlassIcon className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* LINE DIVIDER */}
      <hr className="my-4 border-t border-[#C5C5C5]" />

      <p className="text-black text-sm font-semibold">Recent Chats</p>

      {/* Normal Chat items which contains chatIcon, text, EditIcon and DeleteIcon on the foreground without framer motion */}
      {/* <div className="pt-4 space-y-2">
        <ChatItem
          text="This is a past chat message that might go long enough to fade."
          onEdit={() => console.log("Edit clicked")}
          onDelete={() => console.log("Delete clicked")}
        />
        <ChatItem
          text="Another chat message"
          onEdit={() => {}}
          onDelete={() => {}}
        />
      </div> */}

      {/* Chat items with framer motion */}
      <div className="relative flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto pr-2 pb-8 pt-4 space-y-2">
          {chats.map((chat, i) => (
            <ChatItem
              key={i}
              text={chat}
              onEdit={() => console.log(`Edit chat ${i}`)}
              onDelete={() => handleDelete(i)}
            />
          ))}
        </div>
        {/* Fade gradient overlay */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#E8E6ED] to-transparent" />

        {/* Top fade */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#E8E6ED] to-transparent" />
      </div>

      {/* <ul className="p-4 space-y-2">
        <li className="text-[#130261]">Dashboard</li>
        <li className="text-[#130261]">Prompts</li>
        <li className="text-[#130261]">Settings</li>
      </ul> */}
    </div>
  );
};

export default Sidebar;

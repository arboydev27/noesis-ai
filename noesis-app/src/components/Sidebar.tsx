"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CogIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import ChatItem from "@/components/ChatItem";
import { groupChatsByDate } from "@/utils/SidebarUtils";

const Sidebar = ({
  isOpen,
  toggleSidebar,
  chats,
  setChats,
  onSelectChat,
  onNewChat,
  setIsSearchOpen,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
  onSelectChat: (chatId: number) => void;
  chats: { id: number; prompt: string; createdAt: string }[];
  onNewChat: () => void;
  setChats: React.Dispatch<
    React.SetStateAction<{ id: number; prompt: string; createdAt: string }[]>
  >;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleDelete = async (id: number) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";
    try {
      //  await fetch(`/api/chat-sessions/${id}` - Used for containerized version
      await fetch(`${API_URL}/chat-sessions/${id}`, {
        method: "DELETE",
      });
      setChats((prev) => prev.filter((chat) => chat.id !== id));
    } catch (err) {
      console.error("Failed to delete chat:", err);
    }
  };

  return (
    <div
      // className={`fixed top-0 left-0 h-full w-64 mx-10 bg-white rounded-4xl shadow-md z-30 transform transition-transform duration-300 ${
      className={`fixed top-4 left-4 h-[calc(100%-2rem)] w-80 p-5 bg-white border border-[#441C9A] rounded-4xl z-30 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-[calc(100%+1rem)]"
      } shadow-2xl ring-1 ring-white/30 flex flex-col`}
    >
      {/* User Profile and Settings Div */}
      <div className="w-auto h-22 border border-[#C5C5C5] rounded-2xl p-4 flex flex-row items-center justify-between">
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
      <div className="mt-4 flex flex-row gap-1">
        {/* BEGIN NEW CHAT BUTTON */}
        <button
          className="flex-grow h-14 rounded-full text-white text-sm bg-black hover:bg-[#130261] transition"
          onClick={onNewChat}
        >
          Begin a New Chat
        </button>

        {/* SEARCH BUTTON */}
        <button
          className="h-14 w-14 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#130261] transition"
          onClick={() => setIsSearchOpen(true)}
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* LINE DIVIDER */}
      <hr className="my-4 border-t border-[#C5C5C5]" />

      <p className="text-black text-sm font-semibold">Recent Chats</p>

      {/* Chat items with framer motion */}
      <div className="relative flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto pr-2 pb-8 pt-4 space-y-2">
          {/* {chats.map((chat, i) => (
            <ChatItem
              key={chat.id}
              text={chat.prompt}
              onClick={() => onSelectChat(chat.id)}
              // onEdit={() => console.log(`Edit chat ${chat.id}`)}
              onDelete={() => handleDelete(chat.id)}
            />
          ))} */}
          {groupChatsByDate(chats).map((group) => (
            <div key={group.title} className="mb-6">
              <h3 className="text-xs text-[#441C9A] font-semibold mb-2">
                {group.title}
              </h3>
              <div className="space-y-2">
                {group.chats.map((chat) => (
                  <ChatItem
                    key={chat.id}
                    text={chat.prompt}
                    onClick={() => onSelectChat(chat.id)}
                    onDelete={() => handleDelete(chat.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Fade gradient overlay */}
        {/* <div className="pointer-events-none absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-[#E8E6ED] to-transparent" /> */}

        {/* Top fade */}
        {/* <div className="pointer-events-none absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-[#E8E6ED] to-transparent" /> */}
      </div>
    </div>
  );
};

export default Sidebar;

"use client";

import React, { useState, useMemo } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

interface Chat {
  id: number;
  prompt: string;
  createdAt: string;
}

interface SearchOverlayProps {
  onClose: () => void;
  chats: Chat[];
  onSelectChat: (id: number) => void;
}

const SearchChatCard = ({
  chat,
  onSelect,
}: {
  chat: Chat;
  onSelect?: (id: number) => void;
}) => {
  return (
    <div
      onClick={() => onSelect?.(chat.id)}
      // className="p-3 bg-gray-100 hover:bg-[#f0ebff] rounded-lg cursor-pointer transition"
      className="p-3 flex flex-row gap-2 items-center cursor-pointer hover:bg-[#f0ebff] rounded-xl transition"
    >
      <ChatBubbleLeftEllipsisIcon className="w-4 h-4 text-[#424242] flex-shrink-0" />
      <p className="text-sm text-[#191919] truncate">{chat.prompt}</p>
    </div>
  );
};

const ChatGroup = ({
  title,
  chats,
  onSelect,
}: {
  title: string;
  chats: Chat[];
  onSelect?: (id: number) => void;
}) => {
  if (!chats.length) return null;

  return (
    <div>
      <h2 className="text-sm font-semibold text-[#441C9A] mb-2">{title}</h2>
      <div className="space-y-1">
        {chats.map((chat) => (
          <SearchChatCard key={chat.id} chat={chat} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
};

const SearchOverlay = ({
  onClose,
  chats,
  onSelectChat,
}: SearchOverlayProps) => {
  const [query, setQuery] = useState("");

  const filteredChats = useMemo(() => {
    return chats.filter((chat) =>
      chat.prompt.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, chats]);

  const groupChats = useMemo(() => {
    const today: Chat[] = [];
    const yesterday: Chat[] = [];
    const last7Days: Chat[] = [];

    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];
    const yesterdayStr = new Date(now.getTime() - 86400000)
      .toISOString()
      .split("T")[0];

    filteredChats.forEach((chat) => {
      const createdDate = chat.createdAt.split("T")[0];
      const timeDiff = now.getTime() - new Date(chat.createdAt).getTime();

      if (createdDate === todayStr) {
        today.push(chat);
      } else if (createdDate === yesterdayStr) {
        yesterday.push(chat);
      } else if (timeDiff <= 7 * 86400000) {
        last7Days.push(chat);
      }
    });

    return { today, yesterday, last7Days };
  }, [filteredChats]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-lg animation-[var(--animation-slide-up-fade)]">
        <div className="flex flex-row">
          <input
            type="text"
            placeholder="Search prompts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-6 px-4 py-6 text-[#130261] mb-4"
          />

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 mb-4"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <hr className="bg-black mb-4" />

        <div className="space-y-6 max-h-[300px] overflow-y-auto">
          <ChatGroup
            title="Today"
            chats={groupChats.today}
            onSelect={onSelectChat}
          />
          <ChatGroup
            title="Yesterday"
            chats={groupChats.yesterday}
            onSelect={onSelectChat}
          />
          <ChatGroup
            title="Last 7 Days"
            chats={groupChats.last7Days}
            onSelect={onSelectChat}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;

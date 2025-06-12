"use client";

import { useEffect } from "react";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Home from "@/components/Home";
import SearchOverlay from "@/components/SearchOverlay";

const Background = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chats, setChats] = useState<
    { id: number; prompt: string; createdAt: string }[]
  >([]);
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<{
    prompt: string;
    response: string;
  } | null>(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleBeginNewChat = () => {
    setSelectedChat(null);
    setCurrentSessionId(null);
    setChatMessages([]);
  };

  const handleSelectChat = async (sessionId: number) => {
    try {
      const res = await fetch(
        `http://localhost:3333/chat-sessions/${sessionId}`
      );
      const data = await res.json();

      const messages = data.messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      }));

      setCurrentSessionId(sessionId);
      setChatMessages(messages);
      setSelectedChat(null); // so Home only listens to chatMessages

      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
        setTimeout(() => setChatMessages(messages), 300);
      }
    } catch (err) {
      console.error("Failed to load chat:", err);
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      const res = await fetch("http://localhost:3333/chat-sessions");
      const sessions = await res.json();

      if (!Array.isArray(sessions)) {
        console.error("Expected sessions to be an array, got:", sessions);
        return;
      }

      // setChats(sessions); // sessions are already trimmed now

      const simplified = sessions.map((session: any) => {
        const firstUserMessage = session.messages.find(
          (msg: any) => msg.role === "user"
        );
        return {
          id: session.id,
          createdAt: session.createdAt,
          prompt: firstUserMessage?.content || "(no user message)",
        };
      });

      setChats(simplified);
    };

    fetchChats();
  }, []);

  return (
    <div className="relative inset-0 overflow-hidden h-screen w-screen bg-gradient-to-bl from-purple-200 via-purple-50 to-white z-0">
      {/* Glows */}
      <div className="absolute -top-[400px] -right-[400px] w-[1000px] h-[1000px] bg-[radial-gradient(circle,_#d0d1ff_0%,_transparent_70%)] pointer-events-none z-0" />
      <div className="absolute -bottom-[400px] -left-[400px] w-[1000px] h-[1000px] bg-[radial-gradient(circle,_#d0d1ff_0%,_transparent_70%)] pointer-events-none z-0" />

      {/* Sidebar: now inside this file */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        chats={chats}
        setChats={setChats}
        onSelectChat={handleSelectChat}
        onNewChat={handleBeginNewChat}
        setIsSearchOpen={setIsSearchOpen}
      />

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
        <Home
          setChats={setChats}
          currentSessionId={currentSessionId}
          setCurrentSessionId={setCurrentSessionId}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      </div>

      {isSearchOpen && (
        <SearchOverlay
          onClose={() => setIsSearchOpen(false)}
          chats={chats} // must include createdAt from backend
          onSelectChat={(id) => {
            handleSelectChat(id);
            setIsSearchOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Background;

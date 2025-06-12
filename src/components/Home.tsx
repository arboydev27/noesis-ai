"use client";

import React, { useState, useRef, useEffect } from "react";
import ClientWrapper from "@/components/ClientWrapper";
import PromptBox from "@/components/PromptBox";
import GlassButton from "@/components/GlassButton";
import Image from "next/image";
import TypingDots from "@/components/TypingDots";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

const Home = ({
  setChats,
  chatMessages,
  setChatMessages,
  currentSessionId,
  setCurrentSessionId,
}: {
  setChats: React.Dispatch<
    React.SetStateAction<{ id: number; prompt: string; createdAt: string }[]>
  >;
  chatMessages: { role: "user" | "assistant"; content: string }[];
  setChatMessages: React.Dispatch<
    React.SetStateAction<{ role: "user" | "assistant"; content: string }[]>
  >;
  currentSessionId: number | null;
  setCurrentSessionId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [fullResponse, setFullResponse] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasPromptBeenSubmitted, setHasPromptBeenSubmitted] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const canContinue =
    !isStreaming && currentIndex < fullResponse.split(" ").length;

  const simulateStreaming = (fullText: string, startFrom: number = 0) => {
    const words = fullText.split(" ");
    let i = startFrom;
    let streamed = "";

    intervalRef.current = setInterval(() => {
      if (i >= words.length || isCancelled) {
        clearInterval(intervalRef.current!);
        setIsStreaming(false);
        setCurrentIndex(i);
        return;
      }

      streamed += words[i] + " ";
      i++;

      setChatMessages((prev) => {
        const updated = [...prev];
        if (
          updated.length > 0 &&
          updated[updated.length - 1].role === "assistant"
        ) {
          updated[updated.length - 1].content = streamed;
        }
        return updated;
      });
    }, 80);
  };

  const handleCancelResponse = () => {
    setIsCancelled(true);
    setIsStreaming(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleContinueResponse = () => {
    setIsCancelled(false);
    setIsStreaming(true);
    simulateStreaming(fullResponse, currentIndex);
  };

  const handlePromptSubmit = async (userPrompt: string) => {
    setIsStreaming(true);
    setHasPromptBeenSubmitted(true);

    let sessionId = currentSessionId;

    try {
      let data: any;

      setChatMessages((prev) => [
        ...prev,
        { role: "user", content: userPrompt },
        { role: "assistant", content: "" }, // placeholder for streaming
      ]);

      if (!sessionId) {
        const res = await fetch("http://localhost:3333/chat-sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: 1, content: userPrompt }),
        });

        data = await res.json();
        sessionId = data.sessionId;
        setCurrentSessionId(sessionId);
        setFullResponse(data.reply.content);

        setTimeout(() => {
          simulateStreaming(data.reply.content);
        }, 700); // 300ms delay to show typing dots
      } else {
        const res = await fetch("http://localhost:3333/chat-messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            userId: 1,
            content: userPrompt,
          }),
        });

        data = await res.json();
        setFullResponse(data.assistantMessage.content);

        setTimeout(() => {
          simulateStreaming(data.assistantMessage.content);
        }, 700); // 300ms delay to show typing dots
      }

      const chatRes = await fetch("http://localhost:3333/chat-sessions");
      const chatData = await chatRes.json();

      // Transform: extract first user message per session before calling setChats
      const simplified = chatData.map((session: any) => {
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
    } catch (err) {
      console.error("Error submitting prompt:", err);
    }
  };

  useEffect(() => {
    if (chatMessages.length === 0 && currentSessionId === null) {
      setHasPromptBeenSubmitted(false);
    }
  }, [chatMessages, currentSessionId]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto w-full pt-[88px] pb-[160px] flex flex-col items-center text-center px-2">
        {/* Landing view */}
        {!hasPromptBeenSubmitted && chatMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full flex-grow">
            <ClientWrapper />

            <h1 className="text-[#130261] p-2 text-3xl font-bold md:text-4xl lg:text-5xl xl:text-6xl">
              Hi there!
              <br /> How can I{" "}
              <span className="bg-gradient-to-r from-[#130261] to-[#9747FF] bg-clip-text text-transparent">
                assist
              </span>{" "}
              you today?
            </h1>

            <p className="text-[#666666] p-2 md:text-lg">
              I'm Noesis, ready to assist you with your <br /> everyday work and
              tasks
            </p>

            {/* 🟪 PromptBox centered before chat begins */}
            <div className="w-full px-4 mt-8">
              <PromptBox
                onSubmitPrompt={handlePromptSubmit}
                isStreaming={isStreaming}
                onCancelResponse={handleCancelResponse}
                onContinueResponse={handleContinueResponse}
                canContinueResponse={canContinue}
              />
            </div>

            <div className="text-[#130261] text-xs md:text-base mt-6 flex flex-row gap-2 px-4">
              <GlassButton
                icon={
                  <Image
                    src="/Splash/bottle-emoji.png"
                    alt="Create"
                    width={20}
                    height={20}
                  />
                }
              >
                Ideate
              </GlassButton>
              <GlassButton
                icon={
                  <Image
                    src="/Splash/brain-emoji.png"
                    alt="Brainstorm"
                    width={20}
                    height={20}
                  />
                }
              >
                Iterate
              </GlassButton>
              <GlassButton
                icon={
                  <Image
                    src="/Splash/camera-emoji.png"
                    alt="Analyze Image"
                    width={20}
                    height={20}
                  />
                }
              >
                Fun
              </GlassButton>
              <GlassButton
                icon={
                  <Image
                    src="/Splash/cityskape-emoji.png"
                    alt="Analyze Data"
                    width={20}
                    height={20}
                  />
                }
              >
                Analyze
              </GlassButton>
            </div>
          </div>
        )}

        {/* Chat messages */}
        {chatMessages.length > 0 && (
          <div className="mt-4 flex flex-col md:max-w-2xl w-full space-y-6">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`px-6 py-4 rounded-xl shadow-md max-w-[90%] ${
                  msg.role === "user"
                    ? "bg-[#FADADD]  self-end text-right text-[#130261]"
                    : "bg-[#F3F0FF] self-start text-left text-[#191919]"
                }`}
              >
                <div
                  className={`text-sm font-semibold mb-2 ${
                    msg.role === "user" ? "text-[#D14D72]" : "text-[#7F56D9]"
                  }`}
                >
                  {msg.role === "user" ? "You" : "Noesis 4.0"}
                </div>
                <div className="whitespace-pre-wrap">
                  {msg.role === "assistant" &&
                  isStreaming &&
                  index === chatMessages.length - 1 &&
                  msg.content === "" ? (
                    <TypingDots />
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            {/* <div ref={bottomRef} /> */}
          </div>
        )}
      </div>

      {/* Fixed PromptBox */}
      {/* {(hasPromptBeenSubmitted || chatMessages.length > 0) && (
        <div className="w-full bottom-6 left-0 right-0 px-4 pb-4 z-20">
          <PromptBox
            onSubmitPrompt={handlePromptSubmit}
            isStreaming={isStreaming}
            onCancelResponse={handleCancelResponse}
            onContinueResponse={handleContinueResponse}
            canContinueResponse={canContinue}
          />
        </div>
      )} */}
      {/* PromptBox overlays visually, but not structurally */}
      {(hasPromptBeenSubmitted || chatMessages.length > 0) && (
        <div className="absolute bottom-0 left-0 right-0 px-1 md:px-4 z-20 pointer-events-none">
          <div className="relative pointer-events-auto">
            <div className="backdrop-blur-lg rounded-xl shadow-xl pb-10 -mb-2">
              <PromptBox
                onSubmitPrompt={handlePromptSubmit}
                isStreaming={isStreaming}
                onCancelResponse={handleCancelResponse}
                onContinueResponse={handleContinueResponse}
                canContinueResponse={canContinue}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

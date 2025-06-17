"use client"; // Client component, so it can use hooks like useState

import React from "react";
import { useState, useRef, useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { StopCircleIcon } from "@heroicons/react/24/solid";

interface PromptBoxProps {
  onSubmitPrompt: (prompt: string) => void;
  isStreaming: boolean;
  onCancelResponse: () => void;
  onContinueResponse?: () => void; // Optional prop for continue response
  canContinueResponse: boolean; // Optional prop to check if response can be continued
}

const PromptBox = ({
  onSubmitPrompt,
  isStreaming,
  onCancelResponse,
  onContinueResponse,
  canContinueResponse,
}: PromptBoxProps) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(input);

  // Keep ref in sync with state
  useEffect(() => {
    inputRef.current = input;
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (canContinueResponse && onContinueResponse) {
      onContinueResponse();
      return;
    }

    const trimmed = inputRef.current.trim();
    if (!trimmed) return;

    onSubmitPrompt(trimmed);
    console.log("🚀 Sending prompt:", trimmed);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit} // handleSubmit function
      //   className="mt-8 w-full max-w-md sm:max-w-md md:max-w-lg lg:max-w-3xl mx-auto flex items-center border rounded-full px-1.5 py-2 shadow-md bg-white"
      className="mt-0 w-full max-w-lg lg:max-w-xl mx-auto flex items-center border rounded-3xl px-1.5 py-5 shadow-md bg-white"
    >
      <input
        type="text"
        placeholder="Ask me anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow outline-none bg-transparent px-3 text-[#130261] placeholder-gray-400"
      />
      {isStreaming ? (
        <button
          type="button"
          onClick={onCancelResponse}
          className="bg-[#9747FF] p-2 rounded-full hover:bg-[#7b2cbf] transition-all"
          title="Stop response"
        >
          {/* Stop icon (you can customize this with another HeroIcon) */}
          <StopCircleIcon className="w-5 h-5 text-white" />
        </button>
      ) : (
        <button
          type="submit"
          className="bg-[#441c9a] p-2 mr-2 rounded-full hover:bg-[#3a0ca3] transition-all"
          title="Send prompt"
        >
          <PaperAirplaneIcon className="w-5 h-5 rotate-320 text-white" />
        </button>
      )}
    </form>
  );
};

export default PromptBox;

"use client"; // Client component, so it can use hooks like useState

import React from "react";
import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"; // Importing the Bars3Icon from Heroicons

const PromptBox = () => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the default form submission behavior
    // Handle the prompt submission logic

    console.log("Prompt submitted: ", prompt); // Log the prompt to the console
    // Code to handle prompt logic (Sending to API, etc.)
    setPrompt(""); // Clear the input field after submission
  };

  return (
    <form
      onSubmit={handleSubmit} // handleSubmit function
      className="mt-8 w-full max-w-md sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto flex items-center border rounded-full px-1.5 py-2 shadow-md bg-white"
    >
      <input
        type="text"
        placeholder="Ask me anything..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="flex-grow outline-none bg-transparent px-3 text-[#130261] placeholder-gray-400"
      />
      <button
        type="submit"
        className="bg-[#441c9a] p-2 rounded-full hover:bg-[#3a0ca3] transition-all"
      >
        {/* Using the PaperAirplaneIcon from Heroicons */}
        <PaperAirplaneIcon className="w-5 h-5 rotate-320" />
      </button>
    </form>
  );
};

export default PromptBox;

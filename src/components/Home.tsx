import React from "react";
import ClientWrapper from "@/components/ClientWrapper";
import PromptBox from "@/components/PromptBox";
import GlassButton from "@/components/GlassButton";
import Image from "next/image";

const Home = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center px-2">
      {/* w-screen limits the growth of inner containers */}
      {/*Pulsing Animation */}
      <div>
        <ClientWrapper />
      </div>

      {/* Main Large Text */}
      <h1 className="text-[#130261] p-2 text-3xl font-bold md:text-4xl lg:text-5xl xl:text-6xl">
        Hi there!
        <br /> How can I{" "}
        <span className="bg-gradient-to-r from-[#130261] to-[#9747FF] bg-clip-text text-transparent">
          assist
        </span>{" "}
        you today?
      </h1>

      {/*Smaller follow up Text */}
      <p className="text-[#666666] p-2 md:text-lg">
        I'm Noesis, ready to assist you with your <br /> everyday work and tasks
      </p>

      {/*Ask anything search bar and button */}
      <div className="w-full px-4">
        <PromptBox />
      </div>

      {/*Fixed GlssMorphic Prompt buttons */}
      <div className="text-[#130261] text-xs md:text-base mt-6 flex flex-row gap-2 px-4">
        {/* First button */}
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

        {/* Second button */}
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

        {/* Third button */}
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

        {/* Fourth button */}
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
  );
};

export default Home;

import React from "react";

const TypingDots = () => {
  return (
    <div className="flex space-x-1 mt-2">
      <span
        className="w-2 h-2 bg-[#9747FF] rounded-full"
        style={{
          animation: "bounce 0.6s infinite",
          animationDelay: "0s",
        }}
      />
      <span
        className="w-2 h-2 bg-[#9747FF] rounded-full"
        style={{
          animation: "bounce 0.6s infinite",
          animationDelay: "0.15s",
        }}
      />
      <span
        className="w-2 h-2 bg-[#9747FF] rounded-full"
        style={{
          animation: "bounce 0.6s infinite",
          animationDelay: "0.3s",
        }}
      />
      {/* Inline keyframes */}
      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </div>
  );
};

export default TypingDots;

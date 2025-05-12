"use client";

import React from "react";
import Lottie from "lottie-react";
import animationData from "@/animations/pulsing-animation.json";

const PulsingAnimation = () => {
  return (
    <div>
      <div></div>
      <Lottie
        animationData={animationData}
        loop
        autoplay
        style={{ width: 100, height: 100 }}
      />
    </div>
  );
};

export default PulsingAnimation;

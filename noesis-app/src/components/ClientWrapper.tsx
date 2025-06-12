"use client";

import dynamic from "next/dynamic";

// Only import the PulsingAnimation on the client
const PulsingAnimation = dynamic(() => import("./PulsingAnimation"), {
  ssr: false,
});

export default function ClientWrapper() {
  return <PulsingAnimation />;
}

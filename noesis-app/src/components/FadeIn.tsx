// "use client";

// import React, { useState, useEffect, useRef } from "react";

// interface FadeInProps {
//   children: React.ReactNode;
//   duration?: number; // Fade in duration delay before becoming visible
//   className?: string;
// }

// const FadeIn: React.FC<FadeInProps> = ({
//   children,
//   duration = 0,
//   className,
// }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const elementRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setTimeout(() => {
//             setIsVisible(true);
//           }, duration);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (elementRef.current) {
//       observer.observe(elementRef.current);
//     }

//     return () => {
//       if (elementRef.current) {
//         observer.unobserve(elementRef.current);
//       }
//     };
//   }, [duration]);

//   return (
//     <div
//       ref={elementRef}
//       className={`
//         ${className}
//         transform transition-all duration-700 ease-out
//         ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
//       `}
//     >
//       {children}
//     </div>
//   );
// };

// export default FadeIn;

"use client";

import React, { useState, useEffect, useRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  duration?: number; // delay before fade-in
  fadeDuration?: number; // fade animation speed
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  duration = 0,
  fadeDuration = 700,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, duration);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [duration]);

  return (
    <div
      ref={elementRef}
      style={{ transitionDuration: `${fadeDuration}ms` }}
      className={`
        ${className}
        transition-opacity ease-out
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
    >
      {children}
    </div>
  );
};

export default FadeIn;

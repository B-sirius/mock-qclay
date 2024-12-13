import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export const CustomPointer = ({
  pointerRef,
}: {
  pointerRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  useGSAP(() => {
    // custom pointer follow mouse
    const xTo = gsap.quickTo(pointerRef.current, "x", {
      duration: 0.3,
      ease: "power3",
    });
    const yTo = gsap.quickTo(pointerRef.current, "y", {
      duration: 0.3,
      ease: "power3",
    });
    window.addEventListener("mousemove", (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    });
  });

  return (
    <div className="fixed left-0 top-0 mix-blend-difference pointer-events-none">
      <div
        ref={pointerRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full"
      />
    </div>
  );
};

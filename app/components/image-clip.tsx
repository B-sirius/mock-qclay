import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

export const ImageClip = () => {
  const imageClipRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    // scale the container to 100% when scrolled top
    gsap.to(imageClipRef.current, {
      scrollTrigger: {
        trigger: imageClipRef.current,
        start: "top center",
        end: "bottom bottom",
        scrub: true,
      },
      scale: 1,
    });
  });

  return (
    <div className="relative h-screen w-screen">
      <div
        // container should be full screen when scrolled to the top
        ref={imageClipRef}
        // scale the container to 75% at the beginning
        className="w-full h-full bg-pink-300 scale-75 overflow-hidden"
      >
        <iframe
          title="qclay"
          // iframe should be lager than the container, it will be cut off by overflow-hidden
          className="left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2"
          style={{ pointerEvents: "none" }}
          src="https://player.vimeo.com/video/821037821?h=5b0c8dac09?autoplay=1&amp;loop=1&amp;muted=1&amp;autopause=0&amp;background=1&amp;color=ffffff&amp;controls=2&amp;portrait=0"
          width="1920"
          height="1920"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          data-ready="true"
        />
      </div>
    </div>
  );
};

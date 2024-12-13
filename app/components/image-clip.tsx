import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

export const ImageClip = () => {
  const imageClipRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
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
      <div ref={imageClipRef} className="w-full h-full scale-75">
        <iframe
          title="qclay"
          className="w-full h-full"
          src="https://player.vimeo.com/video/821037821?h=5b0c8dac09?autoplay=1&amp;loop=1&amp;muted=1&amp;autopause=0&amp;background=1&amp;color=ffffff&amp;controls=2&amp;portrait=0"
          width="1062"
          height="1062"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          data-ready="true"
        ></iframe>
      </div>
    </div>
  );
};

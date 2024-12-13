"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomPointer } from "./custom-pointer";
import { Header } from "./header";
import { ImageClip } from "./image-clip";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function Home() {
  const pointerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative min-h-full bg-white text-black">
      {/* header */}
      <Header pointerRef={pointerRef} />
      {/* empty space */}
      <div className="h-[400px]" />
      {/* image clip */}
      <ImageClip />
      <CustomPointer pointerRef={pointerRef} />
    </div>
  );
}

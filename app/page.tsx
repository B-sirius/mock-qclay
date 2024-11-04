"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const pointerRef = useRef<HTMLDivElement | null>(null);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);

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

    // menu hover effect
    const menuItems = menuContainerRef.current?.querySelectorAll(".menu-item");
    if (menuItems) {
      menuItems.forEach((menuItem) => {
        const width = menuItem.clientWidth;
        const height = menuItem.clientHeight;
        const centerX = width / 2;
        const centerY = height / 2;

        const menuItemWrapper = menuItem.querySelector(
          ".menu-item-wrapper"
        ) as HTMLDivElement;

        const xTo = gsap.quickTo(menuItemWrapper, "x", {
          duration: 0.1,
          ease: "power3",
        });
        const yTo = gsap.quickTo(menuItemWrapper, "y", {
          duration: 0.1,
          ease: "power3",
        });

        menuItem.addEventListener("mouseenter", () => {
          gsap.to(pointerRef.current, {
            duration: 0.3,
            scale: 6,
            ease: "power3",
          });
        });
        menuItem.addEventListener("mousemove", (event) => {
          const e = event as MouseEvent;
          const { offsetX, offsetY } = e;
          const shiftXPercent = (offsetX - centerX) / centerX;
          const shiftYPercent = (offsetY - centerY) / centerY;
          const xShift = shiftXPercent * 8;
          const yShift = shiftYPercent * 3;
          xTo(xShift);
          yTo(yShift);
        });
        menuItem.addEventListener("mouseleave", () => {
          gsap.to(pointerRef.current, {
            duration: 0.3,
            scale: 1,
            ease: "power3",
          });
          xTo(0);
          yTo(0);
        });
      });
    }
  });

  return (
    <div className="min-h-full bg-white text-black">
      <header className="fixed w-full flex justify-between px-12.5 pt-12 pb-3">
        <div>Logo</div>
        <div
          ref={menuContainerRef}
          className="flex justify-between font-sans text-19 font-normal w-[32.1875rem]"
        >
          {["Home", "About", "Works", "Contact us"].map((value) => (
            <div className=" menu-item group  cursor-pointer" key={value}>
              <div className="relative menu-item-wrapper overflow-hidden">
                <div className="flex flex-col group-hover:translate-y-[-150%] transition duration-500 ease-out">
                  <span>{value}</span>
                  <span className="absolute top-[150%]">{value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>Menu</div>
      </header>
      {/* custom pointer */}
      <div
        ref={pointerRef}
        className="fixed mix-blend-difference pointer-events-none"
      >
        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full" />
      </div>
    </div>
  );
}

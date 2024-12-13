import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export const Header = ({
  pointerRef,
}: {
  pointerRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const menuContainerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const menuItems = menuContainerRef.current?.querySelectorAll(".menu-item");
    if (!menuItems?.length) return;
    // menu hover effect
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
      // hover effect when mouse enter and leave a menu item
      menuItem.addEventListener("mouseenter", () => {
        gsap.to(pointerRef.current, {
          duration: 0.3,
          scale: 6,
          ease: "power3",
        });
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
      // move effect when mouse move on a menu item
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
    });
  });
  return (
    <header className="fixed w-full flex justify-between px-12.5 pt-12 pb-3 z-10">
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
  );
};

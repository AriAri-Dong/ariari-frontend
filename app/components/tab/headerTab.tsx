"use client";

import { HEADER_MENU_DEFAULT, HEADER_MENU_SM } from "@/data/header";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const HeaderTab = () => {
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  const [activeId, setActiveId] = useState<number | null>(null);
  const [barWidth, setBarWidth] = useState<number>(0);
  const [barLeft, setBarLeft] = useState<number>(0);
  const [menu, setMenu] = useState(HEADER_MENU_DEFAULT);

  const handleNavigation = (path: string, id: number) => {
    setActiveId(id);
    router.push(path);
  };

  const updateBarPosition = () => {
    if (navRef.current && activeId !== null) {
      const activeIndex = menu.findIndex((item) => item.id === activeId);
      if (activeIndex !== -1) {
        const activeItem = navRef.current.children[activeIndex] as HTMLElement;
        if (activeItem) {
          const scrollLeft = navRef.current.scrollLeft;
          setBarWidth(activeItem.offsetWidth);
          setBarLeft(activeItem.offsetLeft - scrollLeft);
        }
      }
    }
  };

  const scrollToActiveItem = () => {
    if (navRef.current && activeId !== null) {
      const activeIndex = menu.findIndex((item) => item.id === activeId);
      if (activeIndex !== -1) {
        const activeItem = navRef.current.children[activeIndex] as HTMLElement;
        if (activeItem) {
          const parentWidth = navRef.current.offsetWidth;
          const itemLeft = activeItem.offsetLeft;
          const itemWidth = activeItem.offsetWidth;
          const scrollLeft = navRef.current.scrollLeft;

          if (
            itemLeft < scrollLeft ||
            itemLeft + itemWidth > scrollLeft + parentWidth
          ) {
            navRef.current.scrollTo({
              left: itemLeft - parentWidth / 2 + itemWidth / 2,
              behavior: "smooth",
            });
          }
        }
      }
    }
  };

  useEffect(() => {
    const updateMenu = () => {
      if (window.innerWidth < 768) {
        setMenu(HEADER_MENU_SM);
      } else {
        setMenu(HEADER_MENU_DEFAULT);
      }
    };

    updateMenu();
    window.addEventListener("resize", updateMenu);

    return () => {
      window.removeEventListener("resize", updateMenu);
    };
  }, []);

  useEffect(() => {
    const activeIndex = menu.findIndex((item) => item.path === pathname);
    if (pathname === "/") {
      setActiveId(null);
      return;
    }

    if (activeIndex !== -1) {
      setActiveId(menu[activeIndex].id);
    }
    updateBarPosition();
    scrollToActiveItem();
  }, [pathname, menu]);

  useEffect(() => {
    if (navRef.current) {
      navRef.current.addEventListener("scroll", updateBarPosition);
    }

    return () => {
      if (navRef.current) {
        navRef.current.removeEventListener("scroll", updateBarPosition);
      }
    };
  }, [activeId, menu]);

  return (
    <div className="relative w-full mt-[26px] md:mt-0">
      <nav
        ref={navRef}
        className="flex space-x-4 md:justify-around lg:justify-start md:space-x-14
        whitespace-nowrap overflow-x-auto no-scrollbar"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {menu.map((item) => (
          <div
            key={item.id}
            onClick={() => handleNavigation(item.path, item.id)}
            className={`flex flex-col items-center cursor-pointer text-sm mb-[10px]
              font-semibold transition-colors duration-300 md:text-lg md:mb-[22px] 
              ${activeId === item.id ? "text-text1" : "text-unselected"}`}
          >
            {item.title}
          </div>
        ))}
      </nav>
      {pathname !== "/" && (
        <div
          className="absolute bottom-0 h-[1px] md:h-[3px] bg-text1 transition-all duration-300"
          style={{ width: `${barWidth}px`, left: `${barLeft}px` }}
        />
      )}
    </div>
  );
};

export default HeaderTab;

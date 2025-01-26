"use client";

import { useEffect, useState } from "react";

const breakpoints: Record<"sm" | "md" | "lg" | "lx", string> = {
  sm: "(min-width: 360px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  lx: "(min-width: 1288px)",
};

const useResponsive = (screen: "sm" | "md" | "lg" | "lx"): boolean => {
  const [isBreakPoint, setIsBreakPoint] = useState<boolean>(false);
  const query = breakpoints[screen];

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const updateBreakPoint = () => setIsBreakPoint(mediaQueryList.matches);

    updateBreakPoint();
    mediaQueryList.addEventListener("change", updateBreakPoint);

    return () => mediaQueryList.removeEventListener("change", updateBreakPoint);
  }, [query]);

  return isBreakPoint;
};

export default useResponsive;

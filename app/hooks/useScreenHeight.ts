import { useEffect, useState } from "react";

const useScreenHeight = (maxHeight: number): boolean => {
  const [isBelowHeight, setIsBelowHeight] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenHeight = () => {
      setIsBelowHeight(window.innerHeight <= maxHeight);
    };

    checkScreenHeight();
    window.addEventListener("resize", checkScreenHeight);

    return () => {
      window.removeEventListener("resize", checkScreenHeight);
    };
  }, [maxHeight]);

  return isBelowHeight;
};

export default useScreenHeight;

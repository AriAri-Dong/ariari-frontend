"use client";

import { useState, useEffect, useRef } from "react";
import loading from "@/images/lottie/loading.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
interface LoadingProps {
  className?: string;
  lottieClassName?: string;
}

const Loading = ({ className = "", lottieClassName = "" }: LoadingProps) => {
  const [isForward, setIsForward] = useState<number>(1);
  const lottieRef = useRef<any>(null);

  // 재생, 역재생 반복
  const handleComplete = () => {
    setIsForward(-isForward);
    lottieRef.current.setDirection(-isForward);
  };

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  }, [isForward]);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 min-h-[300px] md:min-h-[450px] text-center ${className}`}
    >
      <Lottie
        animationData={loading}
        loop={false}
        autoPlay
        className={`text-center w-20 h-20 ${lottieClassName}`}
        lottieRef={lottieRef}
        onComplete={handleComplete}
      />
      <p className="text-mobile_h4_r text-subtext1">Loading..</p>
    </div>
  );
};

export default Loading;

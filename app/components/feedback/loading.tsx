import Lottie from "lottie-react";
import loading from "@/images/lottie/loading.json";

interface LoadingProps {
  className?: string;
  lottieClassName?: string;
}
const Loading = ({ className, lottieClassName }: LoadingProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[300px] md:min-h-[450px] text-center ${className}`}
    >
      <Lottie
        animationData={loading}
        loop
        autoPlay
        className={`text-center w-20 h-20 ${lottieClassName}`}
      />
    </div>
  );
};

export default Loading;

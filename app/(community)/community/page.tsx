"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Alert from "@/components/alert/alert";

const Community = () => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
      router.push("/");
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      className="fixed inset-0 z-50 w-full h-screen overflow-hidden 
    backdrop-blur-sm bg-black/40"
    >
      {showAlert && (
        <Alert
          text="해당 기능을 사용할 수 없습니다."
          subText="메인 페이지로 이동합니다."
        />
      )}
    </div>
  );
};

export default Community;

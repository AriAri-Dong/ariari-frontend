"use client";

import React, { useState, useEffect, useRef } from "react";
import useResponsive from "../../../../../hooks/useResponsive";
import QnaContent from "./qnaContent";

interface QnaFormProps {
  onClose: () => void;
  onSubmit: () => void;
}

/**
 * QnA 작성 바텀 시트/모달 컴포넌트
 * @param onClose 닫기 함수
 * @param onSubmit 제출 함수
 */

const QnaForm = ({ onClose, onSubmit }: QnaFormProps) => {
  const isTapOver = useResponsive("md");

  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    currentY.current = e.touches[0].clientY;
    const translateY = Math.max(0, currentY.current - startY.current);

    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${translateY}px)`;
    }
  };

  const handleTouchEnd = () => {
    const translateY = currentY.current - startY.current;

    if (translateY > 100) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 300);
    } else {
      if (sheetRef.current) {
        sheetRef.current.style.transform = "translateY(0)";
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return !isTapOver ? (
    <div
      id="background"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={(e) =>
        (e.target as HTMLDivElement).id === "background" && onClose()
      }
      style={{ zIndex: 1000 }}
    >
      <div
        ref={sheetRef}
        className={`bg-white w-full p-4 shadow-modal rounded-t-2xl transition-transform h-
          duration-300 ${isClosing ? "translate-y-full" : "translate-y-0"}`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ height: "calc(100vh - 40px)" }}
      >
        <QnaContent
          title={title}
          setTitle={setTitle}
          detail={detail}
          setDetail={setDetail}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  ) : (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      style={{ zIndex: 1000 }}
    >
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative w-[826px] p-5 pb-6 bg-white rounded-[16px]">
        <QnaContent
          title={title}
          setTitle={setTitle}
          detail={detail}
          setDetail={setDetail}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default QnaForm;

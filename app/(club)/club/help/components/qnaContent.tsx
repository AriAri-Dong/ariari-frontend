"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import error from "@/images/icon/error.svg";
import keyboardArrowDown from "@/images/icon/keyboardArrowDown.svg";
import keyboardArrowUp from "@/images/icon/keyboardArrowUp.svg";
import close from "@/images/icon/close.svg";
import Alert from "../../../../components/alert/alert";
import LargeBtn from "../../../../components/button/basicBtn/largeBtn";
import SmallBtn from "@/components/button/basicBtn/smallBtn";

interface QnaFormContentProps {
  title: string;
  setTitle: (value: string) => void;
  detail: string;
  setDetail: (value: string) => void;
  isContentVisible: boolean;
  setIsContentVisible: (value: boolean) => void;
  onClose: () => void;
  onSubmit: () => void;
}

/**
 * qna 모달/바텀시트 공통내용 컴포넌트
 * @param title qna 제목
 * @param setTitle
 * @param detail qna 내용
 * @param setDetail
 * @param isContentVisible 경고문구 visible 여부
 * @param setIsContentVisible
 * @param onClose 바텀시트/모달 닫는 함수
 * @param onSubmit 신고 제출 함수
 * @returns
 */
const QnaFormContent = ({
  title,
  setTitle,
  detail,
  setDetail,
  isContentVisible,
  setIsContentVisible,
  onClose,
  onSubmit,
}: QnaFormContentProps) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!title || !detail) {
      setAlertMessage("미입력한 항목이 있습니다");
      return;
    }

    setTitle("");
    setDetail("");
    onSubmit();
    onClose();
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center pb-4 border-b md:pb-5">
          <h2 className="text-mobile_h1_contents_title md:h1_contents_title">
            Q&A 작성하기
          </h2>
          <button
            onClick={onClose}
            className="flex justify-between items-center"
          >
            <Image
              src={close}
              alt="닫기"
              width={20}
              height={20}
              className="md:w-7 md:h-7"
            />
          </button>
        </div>

        <div className="mt-[30px] md:mt-[22px]">
          <h3 className="flex text-mobile_h2 mb-[14px] md:mb-[18px] md:text-h3">
            Q&A 제목
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Q&A 제목을 입력해주세요"
            className="w-full px-4 py-3 rounded-[12px] bg-searchbar text-mobile_body1_r md:px-[22px] md:py-[13px] md:text-body1_r focus:outline-none"
          />
        </div>
        <div className="mt-[28px]">
          <h3 className="text-mobile_h2 mb-[14px]">질문 상세</h3>
          <div className="py-4 pr-[18px] pl-2.5 bg-slate-100 rounded-xl flex-col justify-start items-start gap-2.5 flex mb-[14px] md:mb-[18px] md:p-4">
            <div className="w-full flex-col justify-start items-start gap-2.5 flex">
              <div className="w-full justify-between items-center flex">
                <div className="items-center gap-2 flex">
                  <Image
                    src={error}
                    alt={"error"}
                    width={18}
                    height={18}
                    className="md:w-6 md:h-6"
                  />
                  <div className="text-mobile_body1_sb text-icon md:text-body1_sb">
                    질문 전 꼭! 읽어주세요.
                  </div>
                </div>
                <div className="justify-between items-center flex overflow-hidden">
                  <Image
                    src={isContentVisible ? keyboardArrowUp : keyboardArrowDown}
                    alt={"keyboardArrowUp"}
                    width={24}
                    height={24}
                    className="md:w-7 md:h-7 cursor-pointer"
                    onClick={() => {
                      setIsContentVisible(!isContentVisible);
                    }}
                  />
                </div>
              </div>
              {isContentVisible && (
                <div className="flex flex-col gap-2 text-body3_m text-icon md:gap-1">
                  <div className="flex gap-1">
                    <p>1.</p>
                    <div>
                      명예훼손, 비방 및 욕설, 기타 게시판의 성격에 맞지 않는
                      내용은 기재하지 말아주세요.{" "}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <p>2.</p>
                    <div>
                      질문은 간결하고, 두괄식으로 작성하는 것을 권장합니다.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <textarea
            placeholder="질문 전에 FAQ를 먼저 확인해 보셨나요? FAQ에서 궁금증을 빠르게 해결하실 수 있습니다."
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            maxLength={1000}
            className="w-full h-[160px] p-1  border-0 rounded-md resize-none text-mobile_body1_r 
          text-subtext1 md:h-[200px] focus:outline-none
          focus:ring-searchbarborder placeholder:text-unselected"
          />
        </div>
      </div>
      <div className="mt-[6px] flex items-center gap-6 md:justify-end">
        <p className="text-right text-unselected text-mobile_h4 md:h4">
          {detail.length}/1000
        </p>
        <div className="md:hidden">
          <LargeBtn onClick={handleSubmit} title={"질문하기"} />
        </div>
        <div className="hidden md:block">
          <SmallBtn
            onClick={handleSubmit}
            title={"질문하기"}
            className="hidden"
          />
        </div>
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default QnaFormContent;

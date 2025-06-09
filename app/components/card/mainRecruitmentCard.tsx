import React, { useEffect, useState } from "react";
import Image from "next/image";
import DdayBadge from "../badge/dDayBadge";
import { MdBookmark } from "react-icons/md";
import { calculateRemainingDays } from "@/utils/dateFormatter";
import { useRouter } from "next/navigation";
import { RecruitmentData } from "@/types/recruitment";
import defaultImg from "@/images/icon/defaultAriari.svg";
import {
  addRecruitmentBookmark,
  removeRecruitmentBookmark,
} from "@/api/recruitment/api";
import NotiPopUp from "../modal/notiPopUp";
import LoginModal from "../modal/login/loginModal";
import MobileLoginModal from "../modal/login/mobileLoginModal";
import {} from "zustand/shallow";
import { useUserStore } from "@/stores/userStore";

interface CardProps {
  data: RecruitmentData[];
}

/**
 * 모집 공고 데이터를 보여주는 카드 컴포넌트
 * @param data 모집 공고 데이터
 * @returns
 */
const MainRecruitmentCard = ({ data }: CardProps) => {
  const router = useRouter();
  const isSignIn = useUserStore((state) => !!state.user);

  const [cardData, setCardData] = useState<RecruitmentData[]>(data);
  const [isNotiPopUpOpen, setIsNotiPopUpOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setCardData(data);
  }, [data]);

  const toggleScrap = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.stopPropagation();
    const updatedCardData = [...cardData];
    const targetItem = updatedCardData[index];

    if (!isSignIn) {
      setIsNotiPopUpOpen(true);
      return;
    }

    try {
      if (targetItem.isMyBookmark) {
        await removeRecruitmentBookmark(targetItem.id);
        targetItem.isMyBookmark = false;
      } else {
        await addRecruitmentBookmark(targetItem.id);
        targetItem.isMyBookmark = true;
      }

      setCardData(updatedCardData);
    } catch (error) {
      console.error("북마크 처리 중 오류가 발생했습니다.", error);
    }
  };

  const handleRouter = (id: string) => {
    router.push(`/recruitment/detail?id=${id}`);
  };

  const handleLoginRedirect = () => {
    setIsNotiPopUpOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <>
      {cardData.map((item, index) => {
        const isExpired = calculateRemainingDays(item.endDateTime) === "마감";
        return (
          <div
            key={index}
            className={`flex gap-4 md:gap-5 md:flex-col cursor-pointer ${
              isExpired ? "opacity-50 backdrop-filter backdrop-blur-md" : ""
            }`}
            onClick={() => handleRouter(item.id)}
          >
            <div className="relative min-w-[114px] md:w-full aspect-square">
              <Image
                src={item.posterUri || defaultImg}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="rounded-3xl"
                // className="rounded-3xl shadow-default"
              />
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 md:bottom-5">
                <DdayBadge date={item.endDateTime} />
              </div>
            </div>
            <div className="flex flex-col w-full md:px-2 md:mt-2.5 md:mb-6">
              <div className="flex justify-between">
                <p className="text-subtext1 text-mobile_body3_m mb-[6px] md:text-h4">
                  {item.title}
                </p>
                <button
                  onClick={(e) => toggleScrap(e, index)}
                  className="focus:outline-none"
                >
                  {item.isMyBookmark ? (
                    <MdBookmark className="text-[#D1F75D] w-5 h-5 md:w-6 md:h-6" />
                  ) : (
                    <MdBookmark className="text-[#E3E3E3] w-5 h-5 md:w-6 md:h-6" />
                  )}
                </button>
              </div>
              <h3 className="line-clamp-2 overflow-hidden text-ellipsis max-w-[166px] text-text1 text-mobile_body1_sb mb-5 md:text-h3 md:h-[54px]">
                {item.body}
              </h3>

              <p className="text-subtext2 text-mobile_body3_m md:text-body2_m">
                서버에 | 데이터를 | 요청 | 해야합니다.
              </p>
            </div>
          </div>
        );
      })}

      {isNotiPopUpOpen && (
        <NotiPopUp
          onClose={() => setIsNotiPopUpOpen(false)}
          icon={"login"}
          title="로그인이 필요한 서비스입니다."
          description={`북마크를 등록하려면\n아리아리 서비스 로그인이 필요합니다.`}
          modalType={"button"}
          firstButton={handleLoginRedirect}
          firstButtonText="로그인 후 이용하기"
          secondButton={() => setIsNotiPopUpOpen(false)}
          secondButtonText="다음에 할게요"
        />
      )}

      {isLoginModalOpen && (
        <>
          <LoginModal onClose={() => setIsLoginModalOpen(false)} />
          <MobileLoginModal onClose={() => setIsLoginModalOpen(false)} />
        </>
      )}
    </>
  );
};

export default MainRecruitmentCard;

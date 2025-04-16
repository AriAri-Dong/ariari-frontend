"use client";

import { Suspense, useEffect, useState } from "react";
import ClubNoticeHeader from "@/(club)/club/management/activity/notice/components/clubNoticeHeader";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import MobileHeaderSection from "./components/mobileHeaderSection";
import FaqDropdown from "./components/faqDropdown";
import { NOTICE_DETAIL, NOTICE_LIST, FAQ_DATA } from "@/data/service";
import {
  SystemNoticeType,
  SystemNoticeDetailType,
  SystemFaqData,
} from "@/types/service";
import {
  getServiceNotices,
  getServiceNoticesDetail,
  getServiceFaqDetail,
} from "@/api/service/api";
import NoticeDropdown from "./components/noticeDropdown";
import useResponsive from "@/hooks/useResponsive";

const HelpPage = () => {
  const isMd = useResponsive("md");

  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [faqList, setFaqList] = useState<SystemFaqData[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [noticeList, setNoticeList] = useState<SystemNoticeType[]>([]);
  const [noticeDetails, setNoticeDetails] = useState<
    Record<number, SystemNoticeDetailType>
  >({});
  const [visibleNoticeCount, setVisibleNoticeCount] = useState<number>(10);
  const [visibleFaqCount, setVisibleFaqCount] = useState<number>(10);

  // 공지사항 리스트 API
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await getServiceNotices();
        setNoticeList(res);
      } catch (err) {
        console.error("공지사항 리스트 불러오기 실패:", err);
      }
    };
    fetchNotices();
  }, []);

  // 공지사항 리스트 테스트용
  // useEffect(() => {
  //   setNoticeList(NOTICE_LIST);
  // }, []);

  // FAQ API
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await getServiceFaqDetail();
        setFaqList(res);
      } catch (err) {
        console.error("FAQ 불러오기 실패:", err);
      }
    };
    fetchFaqs();
  }, []);

  // FAQ 테스트용
  // useEffect(() => {
  //   setFaqList(FAQ_DATA);
  // }, []);

  const handleDropdownToggle = async (id: number) => {
    const isOpen = openDropdownId === id;

    if (isOpen) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);

      // 테스트용
      // if (!noticeDetails[id]) {
      //   setNoticeDetails((prev) => ({
      //     ...prev,
      //     [id]: NOTICE_DETAIL[id],
      //   }));
      // }

      // 동아리 상세 API
      if (!noticeDetails[id]) {
        try {
          const res = await getServiceNoticesDetail(id);
          setNoticeDetails((prev) => ({
            ...prev,
            [id]: res,
          }));
        } catch (err) {
          console.error("공지 상세 불러오기 실패:", err);
        }
      }
    }
  };

  const handleLoadMoreNotices = () => {
    setVisibleNoticeCount((prev) => prev + 10);
  };

  const handleLoadMoreFaqs = () => {
    setVisibleFaqCount((prev) => prev + 10);
  };

  return (
    <div className="mt-8 mb-20 md:mb-[124px]">
      {!isMd && <MobileHeaderSection />}
      <div>
        <h1 className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title md:mb-[22px] mb-5">
          자주 묻는 질문
        </h1>
        <div className="hidden pl-6 pr-[114px] py-1.5 mb-2.5 justify-between bg-white70 text-subtext2 rounded-[4px] text-body1_m md:flex">
          <div className="flex gap-[42px]">
            <p className="px-[19px]">분류</p>
            <p>제목</p>
          </div>
        </div>
        <Suspense fallback={<div>Loading..</div>}>
          <div className="flex flex-col gap-2.5">
            {faqList.slice(0, visibleFaqCount).map((item, i) => (
              <FaqDropdown
                key={`faq-${item.id}-${i}`}
                data={item}
                isOpen={selectedFaq === item.id}
                setSelected={setSelectedFaq}
              />
            ))}
          </div>
        </Suspense>

        {faqList.length > visibleFaqCount && (
          <div className="flex justify-center mt-9 md:mt-10">
            <PlusBtn title={"더보기"} onClick={handleLoadMoreFaqs} />
          </div>
        )}
      </div>
      <div>
        <h1 className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title md:mt-10 mt-12 md:mb-[22px] mb-5">
          서비스 공지사항
        </h1>
        <p className="text-subtext2 text-mobile_body2_m md:text-h4 mt-4 mb-5 md:mt-[22px] md:mb-[22px]">
          총 {noticeList.length}개의 공지사항이 있어요.
        </p>
        <ClubNoticeHeader role="SERVICE_ADMIN" />
        <div className="flex flex-col gap-2.5">
          {noticeList.slice(0, visibleNoticeCount).map((notice, index) => {
            const isOpen = openDropdownId === notice.id;
            const detailed = noticeDetails[notice.id];

            return (
              <NoticeDropdown
                key={notice.id}
                notice={{ ...notice, ...detailed }}
                isOpen={isOpen}
                setOpenDropdownId={() => handleDropdownToggle(notice.id)}
                pin={false}
                index={index}
              />
            );
          })}
        </div>

        {noticeList.length > visibleNoticeCount && (
          <div className="flex justify-center mt-9 md:mt-10">
            <PlusBtn title={"더보기"} onClick={handleLoadMoreNotices} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpPage;

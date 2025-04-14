"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { getClubsInfo } from "@/api/club/api";
import ClubInfoCard from "@/components/card/clubInfoCard";
import ClubIntroduction from "@/components/card/clubIntroduction";
import { ClubListData, ClubResponse } from "@/types/api";
import notIcon from "@/images/icon/popup/not.svg";
import RoundVectorBtn from "@/components/button/iconBtn/roundVectorBtn";
import SearchRecruitmentCard from "@/components/card/searchRecruitmentCard";
import { RecruitmentData } from "@/types/recruitment";
import { calculateRemainingDays } from "@/utils/dateFormatter";
import useResponsive from "@/hooks/useResponsive";
import { RECRUITMENT_DATA } from "@/data/recruitment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AnimatePresence, motion } from "framer-motion";

const MainSection = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const isMdUp = useResponsive("md");

  const [clubData, setClubData] = useState<ClubListData[]>([]);
  const [clubTotalSize, setClubTotalSize] = useState<number>(0);

  const [recruitmentData] = useState<RecruitmentData[]>(RECRUITMENT_DATA);
  const [recruitmentTotalSize] = useState<number>(RECRUITMENT_DATA.length);
  const [desktopPage, setDesktopPage] = useState<number>(1);
  const [mobilePage, setMobilePage] = useState<number>(1);

  const itemsPerPage = 6;
  const mobileItemsPerPage = 3;

  const totalPages = Math.ceil(recruitmentTotalSize / itemsPerPage);
  const mobileTotalPages = Math.ceil(recruitmentTotalSize / mobileItemsPerPage);

  const paginatedData = recruitmentData.slice(
    (desktopPage - 1) * itemsPerPage,
    desktopPage * itemsPerPage
  );

  const fetchClubs = async (page: number) => {
    try {
      const res: ClubResponse = await getClubsInfo(query!, { page, size: 10 });
      setClubData(res.clubDataList);
      setClubTotalSize(res.pageInfo.totalSize);
    } catch (e) {
      console.error("클럽 정보 조회 실패", e);
    }
  };

  useEffect(() => {
    if (query) {
      setClubData([]);
      fetchClubs(0);
    }
  }, [query]);

  useEffect(() => {
    setDesktopPage(1);
    setMobilePage(1);
  }, [isMdUp]);

  if (!query) {
    return (
      <div className="flex bg-white flex-col items-center justify-center min-h-screen text-center">
        <Image
          src={notIcon}
          alt={"404"}
          width={104}
          height={82}
          className="w-[134px] h-[107px]"
        />
        <h1 className="h-[54px] md:h-[72px] text-text1 text-[36px] md:text-[48px] font-light">
          404
        </h1>
        <p className="text-mobile_h4_r text-subtext1">
          요청하신 페이지를 찾을 수 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-20 md:mb-[124px] m-auto md:max-w-screen-lg lg:max-w-screen-lx md:px-5">
      {/* 모집공고 영역 */}

      <div className="flex flex-col pt-5 md:pt-8 md:bg-white bg-sub_bg px-4 md:px-0">
        <div className="flex items-center gap-2 text-mobile_h1_contents_title md:text-h1_contents_title">
          <h1 className="text-primary">검색키워드</h1>
          <h1 className="text-text1">
            {recruitmentTotalSize > 0
              ? "모집공고"
              : "에 대한 모집공고가 없습니다."}
          </h1>
        </div>
        <p className="text-subtext2 text-mobile_body2_m md:text-h4 md:my-[22px] mt-4 mb-5">
          {recruitmentTotalSize > 0
            ? `총 ${recruitmentTotalSize}개의 모집공고가 있어요.`
            : "다른 검색어를 입력하시거나 철자를 확인해보세요."}
        </p>
      </div>
      {/* 모집공고 카드 리스트 */}
      <div className="bg-sub_bg md:rounded-16 p-5 md:p-6">
        {isMdUp ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={desktopPage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:gap-x-[18px]"
              >
                {paginatedData.map((item) => (
                  <SearchRecruitmentCard
                    key={item.id}
                    title={item.body}
                    clubName={item.title}
                    description={item.body}
                    deadline={calculateRemainingDays(item.endDateTime)}
                    isBookmarked={item.isMyBookmark}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center items-center gap-6 mt-6 transition-all duration-300">
              <RoundVectorBtn
                onClick={() => setDesktopPage((prev) => Math.max(1, prev - 1))}
                className="rotate-180"
              />
              <span className="text-text1 text-h5">
                {desktopPage} / {totalPages}
              </span>
              <RoundVectorBtn
                onClick={() =>
                  setDesktopPage((prev) => Math.min(totalPages, prev + 1))
                }
              />
            </div>
          </>
        ) : (
          <>
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              className="md:hidden"
              onSlideChange={(swiper) => {
                setMobilePage(swiper.activeIndex + 1);
              }}
            >
              {Array.from({ length: mobileTotalPages }).map((_, pageIndex) => {
                const start = pageIndex * mobileItemsPerPage;
                const end = start + mobileItemsPerPage;
                const pageItems = recruitmentData.slice(start, end);

                return (
                  <SwiperSlide key={pageIndex}>
                    <div className="flex flex-col gap-4 h-full">
                      {pageItems.map((item) => (
                        <SearchRecruitmentCard
                          key={item.id}
                          title={item.body}
                          clubName={item.title}
                          description={item.body}
                          deadline={calculateRemainingDays(item.endDateTime)}
                          isBookmarked={item.isMyBookmark}
                        />
                      ))}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <div className="flex justify-center items-center mt-5 md:hidden">
              <p className="bg-white70 text-mobile_body3_r text-subtext2 rounded-12 py-0.5 px-2.5">
                {mobilePage} / {mobileTotalPages}
              </p>
            </div>
          </>
        )}
      </div>
      <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:px-5">
        {/* 동아리 영역 */}
        <div className="flex flex-col mt-5 md:mt-8">
          <div className="flex items-center gap-2 text-mobile_h1_contents_title md:text-h1_contents_title">
            <h1 className="text-primary">검색키워드</h1>
            <h1 className="text-text1">
              {clubTotalSize > 0 ? "동아리" : "에 대한 동아리가 없습니다."}
            </h1>
          </div>
          <p className="text-subtext2 text-mobile_body2_m md:text-h4 md:my-[22px] mt-4 mb-5">
            {clubTotalSize > 0
              ? `총 ${clubTotalSize}개의 동아리가 있어요.`
              : "다른 검색어를 입력하시거나 철자를 확인해보세요."}
          </p>
        </div>

        <div className="min-h-[100px] md:min-h-[150px] flex flex-col">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-[18px] md:gap-y-9">
            {clubData.map((club) => (
              <div
                key={club.id}
                className="flex flex-col gap-[14px] md:gap-[22px] md:mt-[18px]"
              >
                <ClubInfoCard {...club} />
                <ClubIntroduction
                  introductionText={club.body}
                  badgeType={club.badgeType}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;

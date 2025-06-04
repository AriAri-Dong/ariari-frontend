import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { throttle } from "lodash";
import useResponsive from "@/hooks/useResponsive";
import RoundVectorBtn from "@/components/button/iconBtn/roundVectorBtn";
import RoundPlusBtn from "@/components/button/iconBtn/roundPlusBtn";
import MyClubCard from "@/components/card/myClubCard";
import { useMyClubListQuery } from "@/hooks/club/my/useMyClubListQuery";

const MyClub = () => {
  const router = useRouter();
  const isMdUp = useResponsive("md");

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const [updateTime, setUpdateTime] = useState<string>("");

  const { data: myClubs, isLoading } = useMyClubListQuery();

  const checkScrollPosition = throttle(() => {
    const el = scrollRef.current;
    if (!el) return;

    setIsFirstSlide(el.scrollLeft <= 0);
    setIsLastSlide(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, 200);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 500, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScrollPosition();

    el.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      el.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [checkScrollPosition, myClubs]);

  useEffect(() => {
    if (myClubs) {
      const now = new Date();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const dd = String(now.getDate()).padStart(2, "0");
      const hh = String(now.getHours()).padStart(2, "0");
      const min = String(now.getMinutes()).padStart(2, "0");
      const formatted = `${mm}.${dd} ${hh}:${min}`;

      setUpdateTime(formatted);
    }
  }, [myClubs]);

  return (
    <section className="mt-5 mb-[30px] md:mt-8 md:mb-[68px]">
      <div className="flex items-center justify-between mb-[18px] md:justify-start md:gap-3 md:mb-[22px]">
        <h1 className="text-mobile_h1_contents_title md:text-h1_contents_title">
          나의 동아리
        </h1>
        {isMdUp ? (
          <div className="text-body3_r text-subtext2">{updateTime} 기준</div>
        ) : (
          <RoundPlusBtn
            className="shrink-0 w-[28px] h-[28px]"
            imageSize={20}
            onClick={() => router.push("/user/club/create")}
          />
        )}
      </div>
      {isMdUp ? (
        <div className="relative">
          {/* 왼쪽 화살표 */}
          <div
            className={`absolute rotate-180 top-[calc(50%-24px)] left-[-10px] ${
              isFirstSlide ? "hidden" : "block"
            }`}
            style={{ zIndex: 1 }}
          >
            <RoundVectorBtn
              className="p-[9px]"
              imageSize={30}
              onClick={scrollLeft}
            />
          </div>
          {/* 스크롤 영역 */}
          <div ref={scrollRef} className="flex overflow-x-auto no-scrollbar">
            <div className="flex gap-4 items-center w-full min-w-max">
              <RoundPlusBtn
                className="shrink-0 w-[60px] h-[60px]"
                onClick={() => router.push("/user/club/create")}
              />
              {myClubs?.myClubDataList.map((club) => (
                <div key={club.id}>
                  <MyClubCard club={club} />
                </div>
              ))}
            </div>
          </div>
          {/* 오른쪽 화살표 */}
          <div
            className={`absolute top-[calc(50%-24px)] right-[-10px] ${
              isLastSlide ? "hidden" : "block"
            }`}
            style={{ zIndex: 1 }}
          >
            <RoundVectorBtn
              className="p-[9px]"
              imageSize={30}
              onClick={scrollRight}
            />
          </div>
        </div>
      ) : (
        <div className="flex gap-4 w-full items-center overflow-x-auto no-scrollbar">
          {myClubs?.myClubDataList.map((club) => (
            <div key={club.id}>
              <MyClubCard club={club} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyClub;

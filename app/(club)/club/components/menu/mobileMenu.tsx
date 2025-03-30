"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import NotificationRoundBtn from "@/components/button/iconBtn/notificationRound";
import RoundVectorBtn from "@/components/button/iconBtn/roundVectorBtn";
import SubTap from "@/components/tab/subTap";
import { CLUB_MENU_MAP } from "@/constants/clubMenu";
import { useClubContext } from "@/context/ClubContext";
import Tabs from "../tabs/mobileTabs";

const MobileMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { role } = useClubContext();

  // 권한에 따른 메뉴 데이터
  const CLUB_LEFT_MENU = CLUB_MENU_MAP[role ?? "USER"];
  const [menuRefs, setMenuRefs] = useState<(HTMLDivElement | null)[]>([]);

  // ✅ 현재 URL과 일치하는 메뉴 옵션 찾기
  const currentOption = CLUB_LEFT_MENU.find(
    (menu) =>
      menu.url === pathname || menu.subUrl?.some((sub) => sub.url === pathname)
  );

  const [option, setOption] = useState<string>(
    currentOption?.label || CLUB_LEFT_MENU[0].label
  );

  useEffect(() => {
    if (currentOption) {
      setOption(currentOption.label);
    }
  }, [pathname]);

  useEffect(() => {
    if (menuRefs.length > 0) {
      const selectedIndex = CLUB_LEFT_MENU.findIndex(
        (menu) => menu.label === option
      );
      if (menuRefs[selectedIndex]) {
        menuRefs[selectedIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [option, menuRefs]);

  const handleOptionChange = (label: string) => {
    const selectedMenu = CLUB_LEFT_MENU.find((menu) => menu.label === label);

    if (Array.isArray(selectedMenu?.subUrl) && selectedMenu.subUrl.length > 0) {
      setOption(label);

      // ✅ 현재 URL(`pathname`)이 `subUrl` 중 하나인지 확인
      const isCurrentSubMenu = selectedMenu.subUrl.some(
        (sub) => sub.url === pathname
      );

      if (!isCurrentSubMenu) {
        // ✅ 현재 URL이 `subUrl` 중 하나가 아닐 경우, 첫 번째 `subUrl`로 이동
        setTimeout(() => {
          router.push(selectedMenu.subUrl[0].url);
        }, 0);
      }
    } else if (selectedMenu?.url) {
      setOption(label);
      router.push(selectedMenu.url);
    }
  };

  // ✅ 하위 메뉴 클릭 시 부모 메뉴 활성화
  const handleSubMenuClick = (parentLabel: string, url: string) => {
    setOption(parentLabel);
    router.push(url);
  };

  const activeTabs =
    CLUB_LEFT_MENU.find((menu) => menu.label === option)?.subUrl ?? null;

  return (
    <div className="flex flex-col">
      <div className="flex mb-4 mt-6 md:mt-0 lg:hidden">
        <div className="w-10 h-10">
          <NotificationRoundBtn onClick={() => {}} />
        </div>
        <div className="flex overflow-x-auto no-scrollbar ml-2 relative">
          <div className="flex whitespace-nowrap">
            <SubTap
              optionData={CLUB_LEFT_MENU}
              selectedOption={option}
              handleOption={handleOptionChange}
              setMenuRefs={setMenuRefs}
            />
          </div>
        </div>
        <div className="flex items-center">
          <RoundVectorBtn
            imageSize={20}
            className="md:hidden w-7 h-7 rotate-90"
            btnSize="small"
            onClick={() => {}}
          />
        </div>
      </div>

      {/* 하위 탭이 존재하는 경우만 렌더링 */}
      {activeTabs && activeTabs.length > 0 && (
        <Tabs
          data={activeTabs.map((tab) => ({
            ...tab,
            onClick: () => handleSubMenuClick(option, tab.url),
          }))}
        />
      )}
    </div>
  );
};

export default MobileMenu;

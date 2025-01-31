"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import NotificationRoundBtn from "@/components/button/iconBtn/notificationRound";
import RoundVectorBtn from "@/components/button/iconBtn/roundVectorBtn";
import SubTap from "@/components/tab/subTap";
import { MONILE_MENU_OPTIONS } from "@/data/club";

const MobileMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

  // `menuRefs`를 `useState`로 관리하여 URL 변경에도 유지되도록 함
  const [menuRefs, setMenuRefs] = useState<(HTMLDivElement | null)[]>([]);

  // 현재 URL과 일치하는 메뉴 옵션 찾기
  const currentOption = MONILE_MENU_OPTIONS.find(
    (menu) => menu.url === pathname
  );

  // 현재 URL과 일치하는 label을 상태로 설정
  const [option, setOption] = useState<string>(
    currentOption?.label || MONILE_MENU_OPTIONS[0].label
  );

  useEffect(() => {
    if (currentOption) {
      setOption(currentOption.label);
    }
  }, [pathname]);

  useEffect(() => {
    // `menuRefs`가 설정되어 있을 때만 실행
    if (menuRefs.length > 0) {
      const selectedIndex = MONILE_MENU_OPTIONS.findIndex(
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
  }, [option, menuRefs]); // `menuRefs`가 변경될 때도 실행되도록 설정

  const handleOptionChange = (label: string) => {
    setOption(label);
    const selectedMenu = MONILE_MENU_OPTIONS.find(
      (menu) => menu.label === label
    );
    if (selectedMenu?.url) {
      router.push(selectedMenu.url);
    }
  };

  return (
    <div className="flex mb-4 mt-6 md:mt-0 lg:hidden">
      <div className="w-10 h-10">
        <NotificationRoundBtn onClick={() => {}} />
      </div>
      <div className="flex overflow-x-auto no-scrollbar ml-2 relative">
        <div className="flex whitespace-nowrap">
          <SubTap
            optionData={MONILE_MENU_OPTIONS}
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
  );
};

export default MobileMenu;

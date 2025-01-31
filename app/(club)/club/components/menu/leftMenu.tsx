import React, { useState, useEffect } from "react";
import Image from "next/image";
import rabbit from "@/images/profile/rabbit.svg";
import file from "@/images/icon/file.svg";
import vector from "@/images/icon/pullDown.svg";
import active from "@/images/icon/active_vector.svg";
import notice from "@/images/icon/notice.svg";
import { usePathname, useRouter } from "next/navigation";
import {
  CLUB_LEFT_MENU_ADMIN,
  CLUB_LEFT_MENU_MEMBER,
  CLUB_LEFT_MENU_USER,
} from "@/data/club";
import SmallBtn from "@/components/button/basicBtn/smallBtn";

/**
 * 임시 메뉴 컴포넌트
 * @returns
 */
const LeftMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<number | null>(null);

  // 임시 권한 설정 (API 연동 전)
  const [authority, setAuthority] = useState<"USER" | "MEMBER" | "ADMIN">(
    "ADMIN"
  );

  // 권한에 따른 메뉴 데이터
  const CLUB_LEFT_MENU =
    authority === "ADMIN"
      ? CLUB_LEFT_MENU_ADMIN
      : authority === "MEMBER"
      ? CLUB_LEFT_MENU_MEMBER
      : CLUB_LEFT_MENU_USER;

  const isActive = (url: string) => pathname === url;

  const isParentActive = (menu: any) =>
    isActive(menu.url) || menu.subUrl?.some((sub: any) => isActive(sub.url));

  // 메뉴 클릭 시 동작
  const handleMenuClick = (menuId: number, url: string, subUrl?: any[]) => {
    if (subUrl?.length) {
      // 서브 메뉴가 있는 경우: 메뉴 펼치기만 동작, URL 이동 X
      setIsSubMenuOpen(isSubMenuOpen === menuId ? null : menuId);
    } else {
      // 서브 메뉴가 없는 경우: URL 이동
      setActiveMenu(menuId);
      setIsSubMenuOpen(null);
      router.push(url);
    }
  };

  // 서브 메뉴 클릭 시 URL로 이동 + 부모 메뉴 활성화
  const handleSubMenuClick = (subUrl: string, parentMenuId: number) => {
    router.push(subUrl);
    setActiveMenu(parentMenuId);
    setIsSubMenuOpen(parentMenuId);
  };

  useEffect(() => {
    // URL에 해당하는 메뉴가 있으면 그 메뉴를 활성화
    CLUB_LEFT_MENU.forEach((menu) => {
      if (isActive(menu.url)) {
        setActiveMenu(menu.id);
        setIsSubMenuOpen(menu.subUrl?.length ? menu.id : null);
      } else {
        menu.subUrl?.forEach((subMenu) => {
          if (isActive(subMenu.url)) {
            setActiveMenu(menu.id);
            setIsSubMenuOpen(menu.id);
          }
        });
      }
    });
  }, [pathname, CLUB_LEFT_MENU]);

  return (
    <div className="hidden lg:block">
      <div className="w-[256px] bg-white rounded-16 py-7 px-4">
        {/* 프로필 영역 */}
        <div className="flex flex-col">
          <div className="flex gap-3">
            <Image src={rabbit} alt={"profile"} width={52} height={52} />
            <div className="flex flex-col gap-1">
              <h3 className="text-body1_sb text-text1">백설공주</h3>
              <div className="flex gap-[6px]">
                <Image src={file} alt={"profile"} width={14} height={18} />
                <p className="text-primary text-body3_m">
                  {authority === "ADMIN"
                    ? "관리자"
                    : authority === "MEMBER"
                    ? "일반회원"
                    : ""}
                </p>
              </div>
            </div>
          </div>
          {authority === "ADMIN" && (
            <SmallBtn
              title={"동아리 정보 수정"}
              onClick={() => {}}
              className="mt-5"
            />
          )}
        </div>

        {/* 메뉴 항목 */}
        {CLUB_LEFT_MENU.map((menu) => (
          <div className="flex items-center mt-6" key={menu.id}>
            {isParentActive(menu) ? (
              <Image
                src={active}
                alt={"active"}
                width={6}
                height={12}
                className="ml-[-16px] self-start mt-1.5"
              />
            ) : (
              <div className="ml-[-10px]" />
            )}

            <div className="flex w-full flex-col items-center">
              <div
                className={`flex w-full items-center justify-between cursor-pointer ml-[16px] 
                  ${isParentActive(menu) ? "text-primary" : "text-unselected"}
                `}
                onClick={() => handleMenuClick(menu.id, menu.url, menu.subUrl)}
              >
                <div className="flex gap-3 items-center">
                  <Image
                    src={notice}
                    alt={"notice"}
                    width={24}
                    height={24}
                    className="ml-1"
                  />
                  <h3 className="text-h4_sb">{menu.label}</h3>
                </div>
                <Image
                  src={vector}
                  alt={"profile"}
                  width={20}
                  height={20}
                  className={`transition-transform duration-300 
                    ${(menu.subUrl?.length ?? 0) > 0 ? "block" : "hidden"} 
                    ${isSubMenuOpen === menu.id ? "rotate-180" : "rotate-0"}
                  `}
                />
              </div>

              {/* 서브 메뉴 */}
              {isSubMenuOpen === menu.id && (menu.subUrl?.length ?? 0) > 0 && (
                <div className="flex flex-col gap-2 pl-9 mt-[14px] self-start ml-3">
                  {(menu.subUrl ?? []).map((subMenu) => (
                    <div
                      key={subMenu.id}
                      className={`cursor-pointer text-body2_r ${
                        isActive(subMenu.url) ? "text-primary" : "text-subtext2"
                      }`}
                      onClick={() => handleSubMenuClick(subMenu.url, menu.id)}
                    >
                      {subMenu.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftMenu;

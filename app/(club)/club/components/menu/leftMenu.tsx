import React, { useState, useEffect } from "react";
import Image from "next/image";
import rabbit from "@/images/profile/rabbit.svg";
import file from "@/images/icon/file.svg";
import notice from "@/images/icon/notice.svg";
import { CLUB_LEFT_MENU } from "@/data/club";
import { usePathname, useRouter } from "next/navigation";

/**
 * 임시 메뉴 컴포넌트
 * @returns
 */
const LeftMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<number | null>(null);

  // URL이 현재 페이지의 URL과 일치하는지 확인하는 함수
  const isActive = (url: string) => pathname === url;

  // 메뉴 클릭 시 동작
  const handleMenuClick = (menuId: number, url: string, subUrl: any[]) => {
    if (subUrl.length > 0) {
      // 서브 메뉴가 있을 경우, 대메뉴를 클릭하면 서브 메뉴가 열리고 해당 대메뉴의 URL로 이동
      setIsSubMenuOpen(isSubMenuOpen === menuId ? null : menuId);
      router.push(url);

      // 서브 메뉴가 있을 경우 부모 메뉴도 활성화
      setActiveMenu(menuId);
    } else {
      // 서브 메뉴가 없으면 해당 대메뉴 URL로 이동
      setActiveMenu(menuId);
      setIsSubMenuOpen(null);
      router.push(url);
    }
  };

  // 서브 메뉴 클릭 시 URL로 이동
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
        setIsSubMenuOpen(menu.subUrl.length > 0 ? menu.id : null);
      } else {
        // 서브 메뉴가 활성화 되어 있는 경우
        menu.subUrl.forEach((subMenu) => {
          if (isActive(subMenu.url)) {
            setActiveMenu(menu.id);
            setIsSubMenuOpen(menu.id);
          }
        });
      }
    });
  }, [pathname]);

  return (
    <div className="hidden lg:block">
      <div className="w-[256px] bg-white rounded-16 py-7 px-4">
        {/* 프로필 영역 */}
        <div className="flex gap-3">
          <Image src={rabbit} alt={"profile"} width={52} height={52} />
          <div className="flex flex-col gap-1">
            <h3 className="text-body1_sb text-text1">동아리활동명</h3>
            <div className="flex gap-[6px]">
              <Image src={file} alt={"profile"} width={14} height={18} />
              <p className="text-primary text-body3_m">일반회원</p>
            </div>
          </div>
        </div>

        {/* 메뉴 항목들 */}
        {CLUB_LEFT_MENU.map((menu) => (
          <div key={menu.id}>
            <div
              className={`cursor-pointer ${
                isActive(menu.url) || activeMenu === menu.id
                  ? "text-primary"
                  : "text-unselected"
              }`}
              onClick={() => handleMenuClick(menu.id, menu.url, menu.subUrl)}
            >
              <div className="flex gap-3 items-center mt-6">
                <Image src={notice} alt={"notice"} width={24} height={24} />
                <h3 className="text-h4_sb">{menu.label}</h3>
              </div>
            </div>

            {/* 서브 메뉴 */}
            {isSubMenuOpen === menu.id && menu.subUrl.length > 0 && (
              <div className="flex flex-col gap-2 pl-9 mt-[14px]">
                {menu.subUrl.map((subMenu) => (
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
        ))}
      </div>
    </div>
  );
};

export default LeftMenu;

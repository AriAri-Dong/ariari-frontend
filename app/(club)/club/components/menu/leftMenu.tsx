import React, { useState, useEffect } from "react";
import Image from "next/image";
import file from "@/images/icon/file.svg";
import vector from "@/images/icon/pullDown.svg";
import active from "@/images/icon/active_vector.svg";
import test_image from "@/images/profile/ariari.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import { useClubContext } from "@/context/ClubContext";
import { CLUB_MENU_MAP, CLUB_MENU_ROLE_LABELS } from "@/constants/clubMenu";
import { MENU_ICONS } from "@/constants/clubMenu";
import { Icon } from "@/components/icon";
import { CLUB_LEFT_MENU_TABS } from "@/data/club";
import ClubNotificationList from "@/components/list/clubNotificationList";

const LeftMenu = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<number | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const clubId = params.get("clubId");

  const { role, clubInfo } = useClubContext();

  // 권한에 따른 메뉴 데이터
  const CLUB_LEFT_MENU = CLUB_MENU_MAP[role ?? "USER"];

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
      router.push(`${url}?clubId=${clubId}`);
    }
  };

  // 서브 메뉴 클릭 시 URL로 이동 + 부모 메뉴 활성화
  const handleSubMenuClick = (subUrl: string, parentMenuId: number) => {
    router.push(`${subUrl}?clubId=${clubId}`);
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
  }, [pathname]);

  if (!clubInfo) return null;
  return (
    <div className="hidden lg:block">
      <div className="w-[256px] h-max max-h-[817px] bg-white rounded-16 py-7 px-4">
        {/* 프로필 영역 - 동아리 회원인 경우만 노출 */}
        {role && (
          <div className="flex flex-col">
            <div className="flex gap-3">
              <Image
                src={clubInfo.clubData.profileUri || test_image}
                alt={"profile"}
                width={52}
                height={52}
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-body1_sb text-text1">
                  {clubInfo.clubMemberData.name}
                </h3>
                <div className="flex gap-[6px]">
                  <Image src={file} alt={"profile"} width={14} height={18} />
                  <p className="text-primary text-body3_m">
                    {CLUB_MENU_ROLE_LABELS[role]}
                  </p>
                </div>
              </div>
            </div>
            {role === "ADMIN" && (
              <SmallBtn
                title={"동아리 정보 수정"}
                onClick={() => {}}
                className="mt-5"
              />
            )}
          </div>
        )}

        {/* 동아리 메뉴/알림 탭 */}
        <div className="flex mt-7">
          {CLUB_LEFT_MENU_TABS.map((tab, idx) => (
            <div
              key={tab.id}
              className="flex-1 text-center"
              onClick={() => setActiveTab(tab.id)}
            >
              <button>
                <div className="flex gap-1 justify-center mb-[10px] min-h-6">
                  <p
                    className={`text-body1_sb ${
                      tab.id === activeTab ? "text-primary" : "text-unselected"
                    }`}
                  >
                    {tab.label}
                  </p>
                  {/* 동아리 알림 개수 */}
                  {tab.id === 1 && (
                    <span className="w-6 h-6 bg-token_bg text-subtext2 text-10 font-medium rounded-full flex justify-center items-center">
                      {14}
                    </span>
                  )}
                </div>
              </button>
              {activeTab === tab.id && (
                <div className="h-[3px] bg-primary pr-1" />
              )}
            </div>
          ))}
        </div>

        {/* 메뉴 항목 */}
        {activeTab === 0 &&
          CLUB_LEFT_MENU.map((menu) => (
            <div className="flex items-center mt-6 first:mt-0" key={menu.id}>
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
                  onClick={() =>
                    handleMenuClick(menu.id, menu.url, menu.subUrl)
                  }
                >
                  <div className="flex gap-3 items-center">
                    <Icon
                      name={menu.icon}
                      color={isParentActive(menu) ? "#589BFF" : "#A1A6B0"}
                      iconMap={MENU_ICONS}
                      className="icon-svg"
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
                {isSubMenuOpen === menu.id &&
                  (menu.subUrl?.length ?? 0) > 0 && (
                    <div className="flex flex-col gap-2 pl-9 mt-[14px] self-start ml-3">
                      {(menu.subUrl ?? []).map((subMenu) => (
                        <div
                          key={subMenu.id}
                          className={`cursor-pointer text-body2_r ${
                            isActive(subMenu.url)
                              ? "text-primary"
                              : "text-subtext2"
                          }`}
                          onClick={() =>
                            handleSubMenuClick(subMenu.url, menu.id)
                          }
                        >
                          {subMenu.label}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          ))}

        {/* 동아리 알림 */}
        {activeTab === 1 && <ClubNotificationList />}
      </div>
    </div>
  );
};

export default LeftMenu;

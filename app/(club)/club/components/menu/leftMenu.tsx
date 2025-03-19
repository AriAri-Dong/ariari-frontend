import React, { useState, useEffect } from "react";
import Image from "next/image";
import file from "@/images/icon/file.svg";
import vector from "@/images/icon/pullDown.svg";
import active from "@/images/icon/active_vector.svg";
import notice from "@/images/icon/notice.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  CLUB_LEFT_MENU_ADMIN,
  CLUB_LEFT_MENU_MEMBER,
  CLUB_LEFT_MENU_USER,
} from "@/data/club";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import ModifyClubInfoModal from "@/components/modal/club/modifyClubInfoModal";
import Alert from "@/components/alert/alert";
import { useClubInfoQuery } from "@/hooks/club/useClubInfoQuery";
import { useClubContext } from "@/context/ClubContext";
import { useUserStore } from "@/providers/userStoreProvider";
import defaultImg from "@/images/icon/defaultAriari.svg";
import { getProfileImage } from "@/utils/profileImage";

/**
 * 메뉴 컴포넌트
 * @returns
 */
const LeftMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const clubId = searchParams.get("clubId") || "";

  const { clubInfo } = useClubInfoQuery(clubId);
  const { role } = useClubContext();
  const clubData = clubInfo?.clubData;
  console.log(role);
  console.log(clubData);

  const nickname = useUserStore((state) => state.memberData.nickname);
  const profileType = useUserStore((state) => state.memberData.profileType);

  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const profileImageSrc = getProfileImage(profileType);

  // 권한에 따른 메뉴 데이터
  const CLUB_LEFT_MENU =
    role === "ADMIN"
      ? CLUB_LEFT_MENU_ADMIN
      : role === "MANAGER"
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

  const handleModifyClubInfo = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (alertMessage) {
    }
  }, [alertMessage]);

  const handleSubmitSuccess = () => {
    setAlertMessage("동아리 정보가 수정되었습니다.");

    // 알럿 메시지 표시 후 3초 뒤 페이지 새로고침
    setTimeout(() => {
      window.location.reload();
      // 2초 후 새로고침
    }, 2000);
  };

  return (
    <div className="hidden lg:block">
      <div className="w-[256px] bg-white rounded-16 py-7 px-4">
        {/* 프로필 영역 */}
        <div className="flex flex-col">
          <div className="flex gap-3">
            <Image
              src={profileImageSrc || defaultImg}
              alt={"profile"}
              width={52}
              height={52}
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-body1_sb text-text1">{nickname}</h3>
              <div className="flex gap-[6px]">
                <Image src={file} alt={"profile"} width={14} height={18} />
                <p className="text-primary text-body3_m">
                  {role === "ADMIN"
                    ? "관리자"
                    : role === "MANAGER"
                    ? "일반회원"
                    : ""}
                </p>
              </div>
            </div>
          </div>
          {role === "ADMIN" && (
            <SmallBtn
              title={"동아리 정보 수정"}
              onClick={handleModifyClubInfo}
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
      {isModalOpen && (
        <ModifyClubInfoModal
          onClose={() => {
            setIsModalOpen(false);
          }}
          onSubmit={handleSubmitSuccess}
        />
      )}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default LeftMenu;

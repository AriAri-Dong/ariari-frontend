"use client";

import LeftMenu from "@/(club)/club/components/menu/leftMenu";
import MobileMenu from "@/(club)/club/components/menu/mobileMenu";

const AccountingPage = () => {
  return (
    <div className="bg-sub_bg flex justify-center items-center w-full pb-20 md:pb-[124px]">
      <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 mt-6 md:mt-8 md:px-5">
        <MobileMenu />
        <div className="flex lg:gap-9">
          {/* 임시 메뉴 */}
          <div className="flex flex-col">
            <LeftMenu />
          </div>
          <div className="flex text-h3 text-text1">
            회계내역 페이지
            <p className="text-subtext1 text-h4_sb">관리자만 볼수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingPage;

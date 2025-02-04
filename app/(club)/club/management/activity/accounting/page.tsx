"use client";

import LeftMenu from "@/(club)/club/components/menu/leftMenu";
import MobileMenu from "@/(club)/club/components/menu/mobileMenu";
import MembershipBalanceBar from "@/components/bar/membershipBalanceBar";
import MobileMembershipBalanceBar from "@/components/bar/mobileMembershipBalanceBar";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import MembershipBalanceList from "@/components/list/membershipBalanceList";
import { TRANSACTIONS } from "@/data/clubAccounting";
import useResponsive from "@/hooks/useResponsive";

const AccountingPage = () => {
  const isMdUp = useResponsive("md");
  const handleWrite = () => {};

  return (
    <div className="bg-sub_bg flex justify-center items-center w-full pb-20 md:pb-[124px]">
      <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 mt-6 md:mt-8 md:px-5">
        <MobileMenu />
        <div className="flex lg:gap-9">
          {/* 임시 메뉴 */}
          <div className="flex flex-col">
            <LeftMenu />
          </div>
          <div className="w-full">
            {isMdUp ? (
              <MembershipBalanceBar
                currentPoint={200}
                className="md:block hidden mb-2.5 md:mt-4 lg:mt-0"
              />
            ) : (
              <MobileMembershipBalanceBar
                currentPoint={200}
                className="mt-4 mb-3 md:hidden"
              />
            )}
            {/* 리스트 영역 */}
            <MembershipBalanceList transactions={TRANSACTIONS} />
            <div className="flex justify-center mt-9 md:mt-10">
              <PlusBtn title={"더보기"} onClick={() => {}} />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-[77px] right-5 md:hidden">
        <WriteBtn onClick={handleWrite} />
      </div>
    </div>
  );
};

export default AccountingPage;

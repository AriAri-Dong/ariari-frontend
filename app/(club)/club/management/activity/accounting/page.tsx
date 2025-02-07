"use client";

import LeftMenu from "@/(club)/club/components/menu/leftMenu";
import MobileMenu from "@/(club)/club/components/menu/mobileMenu";
import Alert from "@/components/alert/alert";
import MembershipBalanceBar from "@/components/bar/membershipBalanceBar";
import MobileMembershipBalanceBar from "@/components/bar/mobileMembershipBalanceBar";
import AccountingBottomSheet from "@/components/bottomSheet/accountingBottomSheet";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import MembershipBalanceList from "@/components/list/membershipBalanceList";
import AccountingModal from "@/components/modal/club/accountingModal";
import { TRANSACTIONS } from "@/data/clubAccounting";
import useResponsive from "@/hooks/useResponsive";
import { MembershipBalance } from "@/types/club";
import { formatDate } from "@/utils/formatDateToDot";
import { useState } from "react";

const AccountingPage = () => {
  const isMdUp = useResponsive("md");

  const [openWrite, setOpenWrite] = useState<boolean>(false);
  const [transactions, setTransactions] =
    useState<MembershipBalance[]>(TRANSACTIONS);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleClose = () => {
    setOpenWrite(false);
  };

  const handleSubmit = (data: {
    date: Date | null;
    transaction: boolean | null;
    amount: number;
    details: string;
  }) => {
    if (!data.date) {
      console.error("날짜가 없습니다.");
      return;
    }

    const formattedDate = formatDate(data.date);

    const newTransaction = {
      date: formattedDate,
      title: data.details,
      amount: data.transaction ? data.amount : -data.amount,
      balance:
        transactions.length > 0
          ? transactions[transactions.length - 1].balance +
            (data.transaction ? data.amount : -data.amount)
          : data.amount,
    };

    setTransactions((prev) => [...prev, newTransaction]);
    handleClose();
    setAlertMessage("회계내역이 등록되었습니다.");
  };

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
            <MembershipBalanceList transactions={transactions} />
            <div className="flex justify-center mt-9 md:mt-10">
              <PlusBtn title={"더보기"} onClick={() => {}} />
            </div>
          </div>
        </div>
        {/* 컴포넌트화 필요 */}
        {isMdUp ? (
          <div className="fixed w-full bottom-5 px-5 flex justify-end md:bottom-[44px] md:max-w-[1248px] md:px-5">
            <WriteBtn onClick={() => setOpenWrite(true)} />
          </div>
        ) : (
          <div className="fixed bottom-[77px] right-5 md:hidden">
            <WriteBtn onClick={() => setOpenWrite(true)} />
          </div>
        )}
        {openWrite &&
          (isMdUp ? (
            <AccountingModal onClose={handleClose} onSubmit={handleSubmit} />
          ) : (
            <AccountingBottomSheet
              onClose={handleClose}
              onSubmit={handleSubmit}
            />
          ))}
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default AccountingPage;

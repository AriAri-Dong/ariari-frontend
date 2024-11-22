"use client";

import LargeBtn from "@/components/button/basicBtn/largeBtn";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import TransparentLargeBtn from "@/components/button/basicBtn/transparentLargeBtn";
import TransparentSmallBtn from "@/components/button/basicBtn/transparentSmallBtn";
import WhiteButton from "@/components/button/basicBtn/whiteBtn";
import RoundVectorBtn from "@/components/button/iconBtn/roundVectorBtn";
import SearchBtn from "@/components/button/iconBtn/searchBtn";
import SendBtn from "@/components/button/iconBtn/sendBtn";
import SahreBtn from "@/components/button/iconBtn/shareBtn";
import SquareVectorBtn from "@/components/button/iconBtn/squareVectorBtn";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import Notification from "@/components/button/iconBtn/notification";
import IconBtn from "@/components/button/withIconBtn/IconBtn";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import LoginBtn from "@/components/button/basicBtn/loginBtn";

const PcButtons = () => {
  return (
    <div className="gap-4 hidden md:block">
      <div className="flex gap-4">
        <div className="flex flex-col items-start space-y-2">
          <LargeBtn title={"제출하기"} onClick={() => {}} />
          <SmallBtn title={"동아리 관리"} onClick={() => {}} />
          <LargeBtn title={"제출하기"} onClick={() => {}} round={true} />
          <SmallBtn title={"동아리 관리"} onClick={() => {}} round={true} />
          <TransparentLargeBtn title={"동아리 관리"} onClick={() => {}} />
          <TransparentSmallBtn title={"동아리 관리"} onClick={() => {}} />
          <TransparentLargeBtn
            title={"동아리 관리"}
            onClick={() => {}}
            round={true}
          />
          <TransparentSmallBtn
            title={"동아리 관리"}
            onClick={() => {}}
            round={true}
          />
          <WhiteButton title={"button"} onClick={() => {}} />
        </div>
        <div className="flex flex-col items-start space-y-2">
          <WriteBtn onClick={() => {}} />
          <SendBtn onClick={() => {}} />
        </div>
        <div className="flex flex-col items-start space-y-2">
          <SahreBtn onClick={() => {}} />
          <SquareVectorBtn onClick={() => {}} />
          <RoundVectorBtn onClick={() => {}} />
          <SearchBtn onClick={() => {}} />
          <Notification size={"large"} onClick={() => {}} />
          <Notification size={"small"} onClick={() => {}} />
        </div>
        <div className="flex flex-col items-start space-y-2">
          <PlusBtn title={"button"} onClick={() => {}} />
          <IconBtn
            type={"reset"}
            size={"small"}
            title={"button"}
            onClick={() => {}}
          />
          <IconBtn
            type={"declaration"}
            size={"large"}
            title={"button"}
            onClick={() => {}}
          />
        </div>
        <div className="flex flex-col items-start space-y-2">
          <LoginBtn onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default PcButtons;

"use client";

import LargeBtn from "@/components/button/basicBtn/largeBtn";
import TransparentSmallBtn from "@/components/button/basicBtn/transparentSmallBtn";
import SendBtn from "@/components/button/iconBtn/sendBtn";
import SahreBtn from "@/components/button/iconBtn/shareBtn";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import IconBtn from "@/components/button/withIconBtn/IconBtn";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import FilterBtn from "@/components/button/iconBtn/filterBtn";
import LoginBtn from "@/components/button/iconBtn/loginBtn";
import DeleteBtn from "@/components/button/iconBtn/deleteBtn";
import DarkBtn from "@/components/button/withIconBtn/darkBtn";

const MobileButtons = () => {
  return (
    <div className="gap-4 block md:hidden">
      <div className="flex gap-4">
        <div className="flex flex-col items-start space-y-2">
          <LargeBtn title={"Button"} onClick={() => {}} />
          <TransparentSmallBtn
            title={"button"}
            onClick={() => {}}
            round={true}
          />
          <WriteBtn onClick={() => {}} />
          <SendBtn onClick={() => {}} />
          <SahreBtn onClick={() => {}} />
          <FilterBtn onClick={() => {}} />
          <LoginBtn onClick={() => {}} />
          <DeleteBtn onClick={() => {}} />
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
          <DarkBtn title={"text"} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default MobileButtons;

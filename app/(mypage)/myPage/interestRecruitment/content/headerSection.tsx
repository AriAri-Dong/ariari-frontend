"use client";

import Image from "next/image";
import trash from "@/images/icon/delete.svg";
import vector from "@/images/icon/backVector.svg";
import IconBtn from "@/components/button/withIconBtn/IconBtn";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NotiPopUp from "@/components/modal/notiPopUp";

const HeaderSection = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAllDelete = () => {
    setIsModalOpen(true);
    console.log("전체 삭제");
  };

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="flex gap-2">
        <Image
          src={vector}
          alt={"뒤로가기"}
          width={24}
          height={24}
          onClick={handleGoBack}
          className="md:hidden cursor-pointer"
        />
        <h1 className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title">
          관심 모집공고
        </h1>
      </div>
      <Image
        src={trash}
        alt={"삭제"}
        width={24}
        height={24}
        onClick={handleAllDelete}
        className="md:hidden cursor-pointer"
      />
      <div className="hidden md:flex">
        <IconBtn
          type={"trash"}
          size={"large"}
          title={"전체삭제"}
          onClick={handleAllDelete}
        />
      </div>
      {isModalOpen && (
        <NotiPopUp
          onClose={() => setIsModalOpen(false)}
          icon="delete"
          title="관심 모집공고 전체 삭제"
          description={`관심 모집공고를 전부 삭제하시겠습니까?`}
          firstButton={() => {}}
          firstButtonText="삭제하기"
          secondButton={() => setIsModalOpen(false)}
          secondButtonText="아니요"
          modalType="button"
        />
      )}
    </div>
  );
};

export default HeaderSection;

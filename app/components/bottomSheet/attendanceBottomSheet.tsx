import Image from "next/image";
import React, { useEffect, useState } from "react";
import close from "@/images/icon/close.svg";

import Alert from "@/components/alert/alert";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import { AttendanceModalProps } from "../modal/club/attendanceModal";
import { useSearchParams } from "next/navigation";
import { CLUB_MEMBER_DATA } from "@/data/clubMembers";
import { ClubMemberData } from "@/types/member";

import copy from "@/images/icon/copy.svg";

import ClubMemberSearch from "@/components/input/clubMemberSearch";
import ClubMemberToken from "@/components/token/clubMemberToken";
import group from "@/images/icon/group.svg";
import TransparentLargeBtn from "../button/basicBtn/transparentLargeBtn";
import { createAttendanceKey } from "@/api/club/event/api";

const AttendanceBottomSheet = ({
  eventId,
  initialAttendees,
  onClose,
  onSubmit,
  onDelete,
}: AttendanceModalProps) => {
  const params = useSearchParams();
  const clubId = params.get("clubId") ?? "";

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [attendees, setAttendees] =
    useState<ClubMemberData[]>(initialAttendees);
  const [attendanceLink, setAttendanceLink] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerateLink = async () => {
    if (attendanceLink) {
      setAlertMessage("이미 생성되었습니다.");
      return;
    }

    try {
      const token = await createAttendanceKey(eventId);
      const url = `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/club/event?clubId=${clubId}&attendanceKey=${token}`;
      setAttendanceLink(url);
    } catch (error) {
      console.error("출석 키 생성 실패", error);
      setAlertMessage("출석 링크 생성에 실패했습니다.");
    }
  };

  const handleMemberClick = (member: ClubMemberData) => {
    if (attendees.some((attendee) => attendee.id === member.id)) {
      setAlertMessage("이미 선택된 회원입니다.");
    } else {
      onSubmit(member.id);
      setAttendees((prev) => [...prev, member]);
    }
  };

  const handleDelete = (memberId: string) => {
    setAttendees((prev) => prev.filter((member) => member.id !== memberId));
    onDelete(memberId);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(attendanceLink);
      setAlertMessage("URL이 복사 되었습니다.");
      return;
    } catch (err) {
      setAlertMessage("URL 복사에 실패했습니다.");
      return;
    }
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50">
      <div className="absolute inset-0" onClick={handleClose} />
      <div
        className={`relative w-full h-4/5 bg-background px-4 rounded-t-[24px] shadow-default transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        } flex flex-col`}
      >
        {/* 제목 영역 */}
        <div className="flex justify-between mt-[22px] mb-4">
          <h1 className="text-text1 text-mobile_h1_contents_title">
            출석 관리
          </h1>
          <Image
            src={close}
            alt={"닫기"}
            width={20}
            height={20}
            onClick={handleClose}
          />
        </div>
        {/* 구분선 */}
        <div className="h-[1px] bg-menuborder" />

        {/* 스크롤 가능한 내용 영역 */}
        <div className="flex-1 overflow-y-auto">
          {/* 출석체크 링크*/}
          <h2 className="mt-[22px] text-text1 text-mobile_h2">
            출석 체크 링크
          </h2>

          <p className="mt-2.5 mb-[14px] text-mobile_body3_r text-subtext2">
            동아리 회원들이 링크를 클릭하면 자동으로 출석체크가 돼요.
            <br />
            생성한 링크를 공유하여 참여인원을 기록해 보세요.
          </p>
          <div className="flex flex-col gap-[14px] mb-[30px]">
            <div className="w-full flex px-4 py-[9px]  gap-4 border border-menuborder rounded-12 md:gap-5 md:px-[22px] md:py-[13px] ">
              <p className="flex-grow min-w-0 break-words text-subtext1 text-mobile_body1_r md:text-body1_r">
                {attendanceLink}
              </p>
              <div
                className="flex items-center min-w-max px-1.5 py-1 cursor-pointer gap-1 md:gap-1.5"
                onClick={handleCopy}
              >
                <Image
                  src={copy}
                  alt="copy"
                  width={16}
                  height={16}
                  className="md:h-4.5 md:h-4.5"
                />
                <p className="text-primary text-mobile_body3_m md:text-body3_m">
                  복사
                </p>
              </div>
            </div>
            <TransparentLargeBtn
              title={"링크 생성"}
              onClick={handleGenerateLink}
            />
          </div>
          {/* 출석 회원 수정 */}
          <div className="flex justify-between mt-7 mb-3 items-center">
            <h2 className="flex text-text1 text-mobile_h2">출석 회원 수정</h2>
          </div>
          <ClubMemberSearch
            clubId={clubId}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setErrorMessage={setErrorMessage}
            handleMemberClick={handleMemberClick}
            placeholder="동아리 활동 이름을 검색해 보세요."
          />
          <div className="flex gap-2 mb-3 mt-[14px]  md:mt-[18px]">
            <Image src={group} alt={"group"} width={20} height={20} />

            <p className="text-mobile_h4 text-subtext2 md:text-h4">출석 회원</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {attendees.map((member) => (
              <ClubMemberToken
                id={member.id}
                name={member.name}
                key={member.id}
                onDelete={() => handleDelete(member.id)}
              />
            ))}
          </div>
        </div>
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default AttendanceBottomSheet;

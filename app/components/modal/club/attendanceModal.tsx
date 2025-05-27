import Image from "next/image";
import React, { useEffect, useState } from "react";
import close from "@/images/icon/close.svg";
import Alert from "@/components/alert/alert";
import SmallBtn from "@/components/button/basicBtn/smallBtn";

import copy from "@/images/icon/copy.svg";

import { ClubMemberData } from "@/types/member";
import TransparentSmallBtn from "@/components/button/basicBtn/transparentSmallBtn";
import MemberSearch from "@/components/input/memberSearch";
import { useSearchParams } from "next/navigation";
import ClubMemberSearch from "@/components/input/clubMemberSearch";
import { CLUB_MEMBER_DATA } from "@/data/clubMembers";
import ClubMemberToken from "@/components/token/clubMemberToken";
import group from "@/images/icon/group.svg";
import { createAttendanceKey } from "@/api/club/event/api";

export interface AttendanceModalProps {
  eventId: string;
  initialAttendees: ClubMemberData[];
  onClose: () => void;
  onSubmit: (memberId: string) => void;
  onDelete: (memberId: string) => void;
}

const AttendanceModal = ({
  eventId,
  initialAttendees,
  onClose,
  onSubmit,
  onDelete,
}: AttendanceModalProps) => {
  const params = useSearchParams();
  const clubId = params.get("clubId") ?? "";

  const [attendees, setAttendees] =
    useState<ClubMemberData[]>(initialAttendees);
  const [attendanceLink, setAttendanceLink] = useState<string>("");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

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

  return (
    <div
      id="background"
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50"
      onClick={(e) =>
        (e.target as HTMLDivElement).id === "background" && handleClose()
      }
    >
      <div
        className={`bg-white p-5 shadow-modal rounded-2xl w-[826px] max-h-[90vh] flex flex-col`}
      >
        <div className="flex justify-between mb-5">
          <h1 className="text-text1 text-h1_contents_title">출석 관리</h1>
          <Image
            src={close}
            alt={"닫기"}
            width={24}
            height={24}
            onClick={handleClose}
            className="md:w-6 md:h-6 cursor-pointer"
          />
        </div>
        <div className="h-[1px] bg-menuborder" />

        {/* content 영역 */}
        <div className="flex-1 ">
          {/* 출석체크 링크*/}
          <h3 className="flex text-text1 text-h3 mt-[22px] mb-2.5">
            출석 체크 링크
          </h3>
          <p className="text-body1_r text-subtext2 mb-[18px]">
            동아리 회원들이 링크를 클릭하면 자동으로 출석체크가 돼요.
            <br />
            생성한 링크를 공유하여 참여인원을 기록해 보세요.
          </p>
          <div className="flex gap-5 mb-1 md:mb-2">
            <div className="w-full flex px-4 py-[9px]  gap-4 border border-menuborder rounded-12 md:gap-5 md:px-[22px] md:py-[13px] ">
              <p className="flex-grow text-subtext1 text-mobile_body1_r md:text-body1_r">
                {attendanceLink}
              </p>
              <div
                className="flex items-center min-w-max cursor-pointer gap-1 md:gap-1.5"
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
            <TransparentSmallBtn
              title={"링크 생성"}
              onClick={handleGenerateLink}
              round={true}
            />
          </div>
          {/* 출석 회원 수정 */}
          <div className="flex justify-between mt-7 mb-3 items-center">
            <h3 className="flex text-text1 text-h3">출석 회원 수정</h3>
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

export default AttendanceModal;

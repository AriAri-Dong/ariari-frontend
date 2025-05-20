"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useDeleteClubAttendanceMutation,
  useRegisterClubAttendanceMutation,
} from "@/hooks/club/evnet/useClubEventMutation";
import useResponsive from "@/hooks/useResponsive";

import vector from "@/images/icon/pullDown.svg";
import dotMenu from "@/images/icon/dotMenu.svg";
import location from "@/images/icon/location.svg";
import group from "@/images/icon/group.svg";
import Alert from "../alert/alert";
import NotiPopUp from "../modal/notiPopUp";
import DotMenuDropDown from "./option/dotMenuDropdown";
import TransparentSmallBtn from "../button/basicBtn/transparentSmallBtn";
import TransparentLargeBtn from "../button/basicBtn/transparentLargeBtn";
import ClubMemberToken from "../token/clubMemberToken";
import ClubEventModal from "../modal/club/clubEventModal";
import AttendanceModal from "../modal/club/attendanceModal";
import ClubEventBottomSheet from "../bottomSheet/clubEventBottomSheet";
import AttendanceBottomSheet from "../bottomSheet/attendanceBottomSheet";
import CommonBottomSheet from "../bottomSheet/commonBottomSheet";
import { clubMemberRoleType } from "@/types/member";
import { ClubEventData } from "@/types/clubEvent";
import { formatKSTTime, formatTime } from "@/utils/formatKSTTime";

const OPTION = [
  { id: 1, label: "수정하기" },
  { id: 2, label: "삭제하기" },
];

interface ClubEventDropdownProps {
  clubId: string;
  event: ClubEventData;
  isOpen: boolean;
  role: clubMemberRoleType | null;

  setOpenDropdownId: (id: string | null) => void;
  onDelete: (id: string) => void;
}

const ClubEventDropdown = ({
  event,
  isOpen,
  clubId,
  role,
  setOpenDropdownId,
  onDelete,
}: ClubEventDropdownProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const isMdUp = useResponsive("md");

  const [openOption, setOpenOption] = useState<boolean>(false);
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);
  const [isNotiPopUpOpen, setIsNotiPopUpOpen] = useState<boolean>(false);
  const [modifyOpen, setModifyOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isAttendanceModalOpen, setAttendanceModalOpen] = useState(false);

  // 출석 등록
  const { mutate: registerAttendance } = useRegisterClubAttendanceMutation({
    clubId,
    onSuccess: () => {},
    onError: () => {
      setAlertMessage("출석 등록에 실패했습니다.");
    },
  });
  // 출석 삭제
  const { mutate: deleteAttendance } = useDeleteClubAttendanceMutation({
    clubId,
    onSuccess: () => {},
    onError: () => {
      setAlertMessage("출석 삭제에 실패했습니다.");
    },
  });
  // 출석 등록 핸들러
  const handleAttendanceSubmit = async (
    clubEventId: string,
    memberIds: string[]
  ) => {
    registerAttendance({ clubEventId, memberIds });
  };
  const handleAttendanceDelete = async (
    clubEventId: string,
    memberIds: string[]
  ) => {
    deleteAttendance({ clubEventId, memberIds });
  };

  const handleVectorClick = useCallback(() => {
    setOpenDropdownId(isOpen ? null : event.id);
  }, [isOpen, event.id, setOpenDropdownId]);

  const handleMenuClick = () => {
    if (isMdUp) {
      setIsOpenOption(!isOpenOption);
    } else {
      setOpenOption(!openOption);
    }
  };

  const handleOptionClick = (label: string) => {
    setIsOpenOption(false);
    if (label === "삭제하기") {
      setIsNotiPopUpOpen(true);
    } else if (label === "수정하기") {
      setModifyOpen(true);
    }
  };

  const handleDelete = () => {
    setIsNotiPopUpOpen(false);
    onDelete(event.id);
  };

  // 메뉴 영역 밖 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpenOption(false);
      }
    };
    if (isOpenOption) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenOption]);

  return (
    <div className="bg-background p-4 md:px-5 md:py-3 rounded-lg ">
      <div className="flex gap-8">
        {isMdUp && (
          <div>
            <p className="text-body3_m text-subtext2">
              {formatTime(event.eventDateTime, "YYYY.MM")}
            </p>
            <p className="text-h1_contents_title text-subtext2">
              {formatTime(event.eventDateTime, "DD")}
            </p>
          </div>
        )}

        <div className="w-full">
          {!isMdUp && (
            <div className="flex items-center justify-between">
              <p className="text-body3_m text-subtext2 mb-1.5">
                {formatTime(event.eventDateTime, "YYYY.MM")}
              </p>
              <Image
                src={dotMenu}
                alt="menu"
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={handleMenuClick}
              />
            </div>
          )}
          <div className="flex gap-4">
            {!isMdUp && (
              <div className="text-mobile_h1_contents_title text-subtext2">
                {formatTime(event.eventDateTime, "DD")}
              </div>
            )}
            <div className="w-full flex justify-between items-center ">
              <div>
                <p className="pt-0.5 pb-1 md:py-1 text-mobile_h4_sb md:text-body1_sb text-text1">
                  {event.title}
                </p>
                <p className="text-subtext2 md:text-body2_r text-body1_r">
                  {event.body}
                </p>
              </div>
              <div className="flex gap-4 items-center">
                {isMdUp && (
                  <TransparentSmallBtn
                    title="출석 관리"
                    onClick={() => {
                      setAttendanceModalOpen(true);
                    }}
                    round={true}
                  />
                )}
                {(role === "ADMIN" || role === "MANAGER") && (
                  <>
                    {isMdUp && (
                      <div ref={menuRef} className="relative inline-block">
                        <Image
                          src={dotMenu}
                          alt="menu"
                          width={24}
                          height={24}
                          className="cursor-pointer"
                          onClick={handleMenuClick}
                        />
                        {isOpenOption && (
                          <DotMenuDropDown onClick={handleOptionClick} />
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-menuborder">
            <div className="flex gap-2">
              <Image src={location} alt={"location"} width={20} height={20} />
              <p className="text-subtext2 md:text-body2_r text-mobile_body2_r">
                {event.location}
              </p>
            </div>
            <div className="flex items-center gap-1 md:gap-2 text-subtext2 text-body2_r ">
              {isMdUp && !isOpen && (
                <p>
                  {event.clubMemberDataList.length > 0
                    ? `${event.clubMemberDataList[0].name} 외 +${
                        event.attendeeCount - 1
                      }`
                    : "0명"}
                </p>
              )}
              {!isMdUp && !isOpen && (
                <div className="flex items-center gap-1">
                  <Image src={group} alt={"group"} width={20} height={20} />
                  <p>{`+ ${event.attendeeCount}`}</p>
                </div>
              )}
              <Image
                src={vector}
                alt="vector"
                width={24}
                height={24}
                className={`cursor-pointer transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                onClick={handleVectorClick}
              />
            </div>
          </div>
        </div>
      </div>

      {/* === 드롭다운 영역 === */}
      {isOpen && (
        <div className="mt-4 md:ml-[83px]">
          <div className="flex gap-2 items-start mb-[18px] md:mb-0">
            <Image src={group} alt={"group"} width={20} height={20} />
            <div className="flex gap-2  flex-wrap ">
              {event.clubMemberDataList.map((member) => (
                <ClubMemberToken
                  key={member.id}
                  id={member.id}
                  name={member.name}
                />
              ))}
            </div>
          </div>
          {!isMdUp && (
            <TransparentLargeBtn
              title="출석 관리"
              onClick={() => {
                setAttendanceModalOpen(true);
              }}
            />
          )}
        </div>
      )}
      {openOption && (
        <CommonBottomSheet
          optionData={OPTION}
          selectedOption={""}
          handleMenuClick={(label: string) => {
            setOpenOption(true);
            if (label === "삭제하기") {
              setIsNotiPopUpOpen(true);
            } else if (label === "수정하기") {
              setModifyOpen(true);
            }
          }}
          onClose={() => {
            setOpenOption(false);
          }}
        />
      )}
      {isNotiPopUpOpen && (
        <NotiPopUp
          onClose={() => setIsNotiPopUpOpen(false)}
          icon={"delete"}
          title="일정 삭제"
          description={`일정을 정말 삭제하시겠습니까? `}
          modalType={"button"}
          firstButton={handleDelete}
          firstButtonText="삭제하기"
          secondButton={() => setIsNotiPopUpOpen(false)}
          secondButtonText="취소하기"
        />
      )}
      {/* 일정 수정 모달 */}
      {modifyOpen &&
        (isMdUp ? (
          <ClubEventModal
            onClose={() => {
              setModifyOpen(false);
            }}
            type="edit"
            eventData={{
              id: event.id,
              date: new Date(event.eventDateTime),
              title: event.title,
              body: event.body,
              location: event.location,
            }}
            onSubmit={() => {
              setAlertMessage("일정이 수정되었습니다.");
            }}
          />
        ) : (
          <ClubEventBottomSheet
            onClose={() => {
              setModifyOpen(false);
            }}
            type="edit"
            eventData={{
              id: event.id,
              date: new Date(event.eventDateTime),
              title: event.title,
              body: event.body,
              location: event.location,
            }}
            onSubmit={() => {
              setAlertMessage("일정이 수정되었습니다.");
            }}
          />
        ))}
      {/* 출석 수정 모달 */}
      {isAttendanceModalOpen &&
        (isMdUp ? (
          <AttendanceModal
            onClose={() => {
              setAttendanceModalOpen(false);
            }}
            onSubmit={(memberId: string) => {
              handleAttendanceSubmit(event.id, [memberId]);
            }}
            onDelete={(memberId: string) => {
              handleAttendanceDelete(event.id, [memberId]);
            }}
            initialAttendees={event.clubMemberDataList}
            eventId={event.id}
          />
        ) : (
          <AttendanceBottomSheet
            onClose={() => {
              setAttendanceModalOpen(false);
            }}
            onSubmit={(memberId: string) => {
              handleAttendanceSubmit(event.id, [memberId]);
            }}
            onDelete={(memberId: string) => {
              handleAttendanceDelete(event.id, [memberId]);
            }}
            initialAttendees={event.clubMemberDataList}
            eventId={event.id}
          />
        ))}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ClubEventDropdown;

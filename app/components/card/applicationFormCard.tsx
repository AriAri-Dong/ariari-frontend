import { useState } from "react";
import ResultBadge from "../badge/resultBadge";
import TransparentSmallBtn from "../button/basicBtn/transparentSmallBtn";
import CheckBox from "../checkBox/checkBox";
import InterviewNoticeModal from "../modal/club/interviewNoticeModal";
import useResponsive from "../../../hooks/useResponsive";
import InterviewNoticeBottomSheet from "../bottomSheet/interviewNoticeBottomSheet";
import Alert from "../alert/alert";
import ApplicationFromViewModal from "../modal/club/applicationFormViewModal";
import testImage from "@/images/icon/calender.svg";
import MobileApplicationFormViewModal from "../modal/club/mobileApplicationFormViewModal";

interface ApplicationFormCardProps {
  clubName: string;
  serviceNickname: string;
  status: "합격" | "불합격" | "대기중" | "면접중";
  recruitmentTitle: string;
  isChecked: boolean;
  onClick: () => void;
  onCheck: (isChecked: boolean) => void;
}

const SAMOLE_DATA = [
  { label: "이름", value: "김아리" },
  { label: "성별", value: "남자" },
  { label: "생년월일", value: "2000년 00월 00일" },
  { label: "연락처", value: "010-0000-0000" },
  { label: "이메일", value: "example@gmail.com" },
  { label: "자유 항목 제목 1", value: "Default Text" },
  { label: "자유 항목 제목 2", value: "Default Text" },
];

const ApplicationFormCard = ({
  clubName,
  serviceNickname,
  status,
  recruitmentTitle,
  isChecked,
  onClick,
  onCheck,
}: ApplicationFormCardProps) => {
  const isMdUp = useResponsive("md");

  const [openFormModal, setOpenFormModal] = useState<boolean>(false);
  const [openNoticeModal, setOpenNoticeModal] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleBadgeClick = () => {
    if (status === "대기중") {
      setOpenNoticeModal(true);
    }
  };

  const handleSubmitSuccess = () => {
    setAlertMessage("면접 안내를 전송했습니다.");
    setOpenNoticeModal(false);
  };

  const handleView = () => {
    setOpenFormModal(true);
  };

  return (
    <div className="w-full bg-background py-[14px] px-4 md:py-[18px] md:px-6 rounded-lg">
      <div className="flex justify-between gap-3 md:gap-8">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between md:py-2">
            <div className="flex flex-col items-center gap-1 md:flex-row md:gap-3">
              <CheckBox
                isChecked={isChecked}
                label={clubName}
                onClick={() => onCheck(!isChecked)}
              />
              <p className="text-subtext2 self-start text-mobile_body2_m md:text-body3_m md:self-center">
                {serviceNickname}
              </p>
            </div>
            <div
              onClick={handleBadgeClick}
              className={`${status === "대기중" && "cursor-pointer"}`}
            >
              <ResultBadge status={status} />
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <p className="text-mobile_body3_r md:text-body2_m text-subtext2 w-full bg-sub_bg p-2.5 rounded-lg md:py-2 md:px-3">
              {recruitmentTitle}
            </p>
            <TransparentSmallBtn
              title={"열람하기"}
              onClick={handleView}
              round={true}
              className="md:hidden block"
            />
          </div>
        </div>
        <TransparentSmallBtn
          title={"열람하기"}
          onClick={handleView}
          round={true}
          className="hidden md:block"
        />
      </div>
      {isMdUp
        ? openNoticeModal && (
            <InterviewNoticeModal
              onClose={() => setOpenNoticeModal(false)}
              onSubmit={handleSubmitSuccess}
            />
          )
        : openNoticeModal && (
            <InterviewNoticeBottomSheet
              onClose={() => setOpenNoticeModal(false)}
              onSubmit={handleSubmitSuccess}
            />
          )}
      {isMdUp
        ? openFormModal && (
            <ApplicationFromViewModal
              onClose={() => setOpenFormModal(false)}
              data={{
                name: "김아리",
                image: testImage,
                nickname: "백설공주",
              }}
              fields={SAMOLE_DATA}
              portfolio={true}
              portfolioData={{
                portfolioPurpose: "프로젝트 목적s",
                portfolioText: "포트폴리오 내용",
                portfolioFile: "file.pdf",
              }}
            />
          )
        : openFormModal && (
            <MobileApplicationFormViewModal
              onClose={() => setOpenFormModal(false)}
              data={{
                name: "김아리",
                image: testImage,
                nickname: "백설공주",
              }}
              fields={SAMOLE_DATA}
              portfolio={true}
              portfolioData={{
                portfolioPurpose: "프로젝트 목적s",
                portfolioText: "포트폴리오 내용",
                portfolioFile: "file.pdf",
              }}
            />
          )}

      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ApplicationFormCard;

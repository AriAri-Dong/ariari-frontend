import React, { useState, useEffect } from "react";
import { useUserStore } from "@/providers/userStoreProvider";
import Image from "next/image";
import close from "@/images/icon/close.svg";
import ApplicationFieldForm from "@/components/form/application/applicationFieldForm";
import ClubInfo from "@/(recruitment)/recruitment/detail/content/clubInfo";
import { profileImageMap } from "@/utils/mappingProfile";
import {
  ApplicationKeys,
  ApplyAnswerReq,
  ApplyFormData,
  ApplyQuestionData,
  ApplySaveReq,
  SpecialQuestionList,
} from "@/types/application";
import { ClubInfoCard } from "@/types/components/card";
import TransparentSmallBtn from "@/components/button/basicBtn/transparentSmallBtn";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import { postApplicationForm } from "@/api/apply/api";
import Alert from "@/components/alert/alert";
import { useRouter } from "next/navigation";
import { APPLICATION_DISPLAY_INFO } from "@/data/application";

interface ModalProps {
  recruitmentData: ClubInfoCard;
  applyFormData: ApplyFormData;
  onClose: () => void;
}

const ApplicationFormModal = ({
  recruitmentData,
  applyFormData,
  onClose,
}: ModalProps) => {
  const router = useRouter();
  const nickname = useUserStore((state) => state.memberData.nickname);
  const profileType = useUserStore((state) => state.memberData.profileType);

  // 렌더링할 필드 관련 상태
  const [specialQuestionList, setSpecialQuestionList] =
    useState<SpecialQuestionList>();
  const [selectedFields, setSelectedFields] = useState<ApplicationKeys[]>([]);
  const [portfolioCollected, setPortfolioCollected] = useState<boolean>(false);
  const [documentQuestions, setDocumentQuestions] = useState<
    ApplyQuestionData[]
  >([]);

  // 사용자 응답 관련 상태
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [inputValues, setInputValues] = useState<
    Partial<Record<ApplicationKeys, string>>
  >({});
  const [name, setName] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [url, setUrl] = useState<string>("");

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const formatPhoneNumber = (value: string) => {
    if (value.length <= 3) return value;
    if (value.length <= 7) return `${value.slice(0, 3)}-${value.slice(3)}`;
    return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
  };

  const handleInputChange = (fieldKey: ApplicationKeys, value: string) => {
    if (fieldKey === "phone") {
      const onlyNumbers = value.replace(/[^0-9]/g, "");
      const formattedValue = formatPhoneNumber(onlyNumbers);

      setInputValues((prev) => {
        return { ...prev, [fieldKey]: formattedValue };
      });
    } else {
      setInputValues((prev) => {
        return { ...prev, [fieldKey]: value };
      });
    }
  };

  // PDF 파일 선택 시 상태 업데이트
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  // 파일 제거
  const handleRemoveFile = () => {
    setFileName(null);
  };

  // 답변 입력 핸들러
  const handleAnswerChange = (index: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleClose = () => {
    onClose();
  };
  // 유효성 검사 및 요청 데이터 생성
  const createApplySaveReq = (): ApplySaveReq => {
    if (!name) {
      setAlertMessage("이름을 입력해주세요.");
      throw new Error("이름을 입력해주세요.");
    }

    const applyAnswers: ApplyAnswerReq[] = [];
    // 선택항목 유효성 검사
    if (specialQuestionList) {
      Object.entries(specialQuestionList).forEach(([key, applyQuestionId]) => {
        if (!applyQuestionId) return;

        if (
          !inputValues ||
          !(key in inputValues) ||
          !inputValues[key as ApplicationKeys]
        ) {
          setAlertMessage(
            `${
              APPLICATION_DISPLAY_INFO[key as ApplicationKeys]
            } 항목을 입력해주세요`
          );
          throw new Error(
            `${
              APPLICATION_DISPLAY_INFO[key as ApplicationKeys]
            } 항목을 입력해주세요.`
          );
        }

        applyAnswers.push({
          applyQuestionId,
          body: inputValues[key as ApplicationKeys]!,
        });
      });
    }
    // 추가 항목 유효성 검사
    if (documentQuestions) {
      Object.entries(documentQuestions).forEach(([id, item]) => {
        if (!answers[item.id]) {
          setAlertMessage(`모든 항목에 대한 답변을 입력해주세요.`);
          throw new Error(`모든 항목에 대한 답변을 입력해주세요.`);
        }

        applyAnswers.push({
          applyQuestionId: item.id,
          body: answers[item.id],
        });
      });
    }

    return {
      name,
      portfolioUrl: url,
      applyAnswers,
    };
  };

  const handelSubmit = () => {
    try {
      const applySaveReqData = createApplySaveReq();

      postApplicationForm(recruitmentData.id, applySaveReqData).then((res) => {
        if (res === 200) {
          setAlertMessage("지원서 제출이 완료되었습니다.");
          router.push("/application");
        } else {
          setAlertMessage("지원서 제출에 실패했습니다. 다시 시도해주세요.");
        }
      });
      console.log(applySaveReqData);
    } catch (error) {
      console.error("Error creating applySaveReqData:", error);
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    setPortfolioCollected(applyFormData.portfolio);
    setDocumentQuestions(applyFormData.applyQuestionDataList);
    setSpecialQuestionList(applyFormData.specialQuestionList);

    if (applyFormData.specialQuestionList) {
      const data: ApplicationKeys[] = Object.keys(
        applyFormData.specialQuestionList
      ).filter(
        (key): key is ApplicationKeys =>
          applyFormData.specialQuestionList[key as ApplicationKeys] !== null
      );
      setSelectedFields(data);
    }
  }, [applyFormData]);

  return (
    <div
      id="background"
      className="fixed flex-col gap-5 inset-0 z-50 flex
          items-center justify-center backdrop-blur-sm bg-black bg-opacity-50"
    >
      <div
        className="absolute top-4 right-4 cursor-pointer bg-white p-2 border border-menuborder rounded-full"
        onClick={handleClose}
      >
        <Image src={close} alt={"닫기"} width={24} height={24} />
      </div>
      {/* Header */}
      <div
        className="bg-background flex w-[900px] h-14 rounded-[32px] 
          items-center justify-between py-[14px] px-6"
      >
        <div className="flex gap-3 items-center">
          <Image
            src={profileImageMap[profileType ?? "ARIARI_MONKEY"]}
            alt={"프로필"}
            width={32}
            height={32}
          />
          <h1 className="text-text1 text-h4_sb">{`${nickname}의 지원서`}</h1>
        </div>
      </div>
      <div className="bg-white w-[900px] max-h-[75vh] rounded-2xl shadow-modal flex flex-col p-6">
        <div className="custom-scrollbar overflow-y-auto">
          <ClubInfo recruitmentData={recruitmentData} isPreview={true} />
          <ApplicationFieldForm
            selectedFields={selectedFields}
            portfolioCollected={portfolioCollected}
            documentQuestions={documentQuestions}
            name={name}
            setName={setName}
            fileName={fileName}
            handleFileChange={handleFileChange}
            handleRemoveFile={handleRemoveFile}
            answers={answers}
            handleAnswerChange={handleAnswerChange}
            url={url}
            setUrl={setUrl}
            inputValues={inputValues}
            handleInputChange={handleInputChange}
          />
          <div className="flex gap-4 justify-center mt-[42px]">
            <TransparentSmallBtn
              title={"임시저장"}
              round={true}
              onClick={() => {}}
            />
            <SmallBtn
              title={"제출하기"}
              onClick={handelSubmit}
              round={true}
              className="h-[44px] flex flex-col items-center justify-center"
            />
          </div>
          {alertMessage && (
            <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationFormModal;

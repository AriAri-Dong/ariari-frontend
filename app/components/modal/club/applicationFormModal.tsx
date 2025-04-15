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
  SpecialQuestionList,
} from "@/types/application";
import TransparentSmallBtn from "@/components/button/basicBtn/transparentSmallBtn";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import {
  getApplicationTemp,
  postApplication,
  postApplicationTemp,
  putApplicationTemp,
} from "@/api/apply/api";
import Alert from "@/components/alert/alert";
import { useRouter } from "next/navigation";
import { APPLICATION_DISPLAY_INFO } from "@/data/application";
import { RecruitmentData } from "@/types/recruitment";
import { ClubData } from "@/types/club";

export interface ApplicationFormModalProps {
  recruitmentData: RecruitmentData;
  clubData: ClubData;
  applyFormData: ApplyFormData;
  bookmarks: number;
  isMyApply: boolean;
  myRecentApplyTempId?: string | null;
  handleApplyTempId?: (tempId: string) => void;
  onClose: () => void;
}

const ApplicationFormModal = ({
  recruitmentData,
  clubData,
  applyFormData,
  bookmarks,
  isMyApply,
  myRecentApplyTempId,
  handleApplyTempId,
  onClose,
}: ApplicationFormModalProps) => {
  const router = useRouter();
  const nickname = useUserStore((state) => state.memberData.nickname);
  const profileType = useUserStore((state) => state.memberData.profileType);

  const [recentApplyTempId, setRecentApplyTempId] = useState<string | null>(
    myRecentApplyTempId || null
  );

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
  const [inputValues, setInputValues] = useState<Partial<SpecialQuestionList>>(
    {}
  );
  const [name, setName] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);

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
      setFile(file);
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
  const createApplySaveReq = (type: "APPLY" | "APPLY_TEMP"): FormData => {
    if (type == "APPLY" && !name) {
      setAlertMessage("이름을 입력해주세요.");
      throw new Error("이름을 입력해주세요.");
    }

    const applyAnswers: ApplyAnswerReq[] = [];
    // 선택항목 유효성 검사
    if (specialQuestionList) {
      Object.entries(specialQuestionList).forEach(([key, applyQuestionId]) => {
        if (!applyQuestionId) return;

        if (inputValues[key as ApplicationKeys])
          applyAnswers.push({
            applyQuestionId,
            body: inputValues[key as ApplicationKeys]!,
          });
      });
    }
    // 추가 항목
    if (documentQuestions) {
      Object.entries(documentQuestions).forEach(([id, item]) => {
        if (answers[item.id])
          applyAnswers.push({
            applyQuestionId: item.id,
            body: answers[item.id],
          });
      });
    }

    const saveReq = {
      name,
      portfolioUrl: url,
      [type === "APPLY" ? "applyAnswers" : "applyAnswerTemp"]: applyAnswers,
    };

    const formData = new FormData();

    formData.append(
      recentApplyTempId && type === "APPLY_TEMP" ? "modifyReq" : "saveReq",
      new Blob([JSON.stringify(saveReq)], { type: "application/json" })
    );

    // 파일이 있으면 추가
    if (file) {
      formData.append("file", file);
    }
    return formData;
  };

  const handelSubmit = (type: "APPLY" | "APPLY_TEMP") => {
    try {
      const formData = createApplySaveReq(type);
      // 지원
      if (type === "APPLY") {
        postApplication(recruitmentData.id, formData).then((res) => {
          if (res === 200) {
            setAlertMessage("지원서 제출이 완료되었습니다.");
            router.push("/application");
          } else {
            setAlertMessage("지원서 제출에 실패했습니다. 다시 시도해주세요.");
          }
        });
      } else {
        // 임시지원 수정
        if (recentApplyTempId) {
          putApplicationTemp(recentApplyTempId, formData).then((res) => {
            if (res === 200) {
              setAlertMessage("임시 저장되었습니다.");
            } else {
              setAlertMessage("문제가 발생했습니다.");
            }
          });
          // 임시지원 생성
        } else {
          postApplicationTemp(recruitmentData.id, formData).then((res) => {
            if (res) {
              setAlertMessage("임시 저장되었습니다.");
              setRecentApplyTempId(res);
              if (handleApplyTempId) {
                handleApplyTempId(res);
              }
            } else {
              setAlertMessage("문제가 발생했습니다.");
            }
          });
        }
      }
    } catch (error) {
      console.error("applySaveReqData 생성 오류", error);
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

  useEffect(() => {
    if (myRecentApplyTempId)
      getApplicationTemp(myRecentApplyTempId).then(async (res) => {
        setName(res.applyData.name);
        if (res.portfolioUrl && res.portfolioUrl !== "") {
          setUrl(res.portfolioUrl);
        }
        setInputValues(res.specialAnswerList);

        const answerMap: Record<string, string> = {};
        res.applyAnswerDataList.forEach((answer) => {
          const questionId = answer.applyQuestionData.id;
          const body = answer.body;
          answerMap[questionId] = body;
        });

        setAnswers(answerMap);

        if (res.fileUri) {
          try {
            const response = await fetch(res.fileUri);
            const blob = await response.blob();

            const rawFileName = res.fileUri.split("/").pop() || "portfolio.pdf";

            const fileName =
              rawFileName.split("_applyTemp_")[1] || "portfolio.pdf";

            const fileFromUrl = new File([blob], fileName, {
              type: blob.type || "application/pdf",
            });

            setFile(fileFromUrl);
            setFileName(fileName);
          } catch (err) {
            console.error("파일 객체 변환 실패", err);
          }
        }
      });
  }, [myRecentApplyTempId]);

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
          <div className="pb-2 border-b border-menuborder">
            <ClubInfo
              recruitmentData={recruitmentData}
              type="APPLYING"
              clubData={clubData}
              applyFormData={applyFormData}
              isMyApply={isMyApply}
              bookmarks={bookmarks}
            />
          </div>
          <div className="pt-[48px]">
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
          </div>
          <div className="flex gap-4 justify-center mt-[42px]">
            <TransparentSmallBtn
              title={"임시저장"}
              round={true}
              onClick={() => handelSubmit("APPLY_TEMP")}
            />
            <SmallBtn
              title={"제출하기"}
              onClick={() => handelSubmit("APPLY")}
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

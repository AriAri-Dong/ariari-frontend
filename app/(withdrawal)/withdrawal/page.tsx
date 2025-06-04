"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/providers/userStoreProvider";
import { useShallow } from "zustand/shallow";

import HeaderSection from "./content/headerSection";
import NoticeCard from "@/components/card/NoticeCard";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import SelectAdministrator from "@/components/card/selectAdministrator";
import LeaveDialog from "@/components/modal/leave/leaveDialog";
import MobileSnackBar from "@/components/bar/mobileSnackBar";
import Alert from "@/components/alert/alert";

import { WITHDRAWAL_INFO } from "@/data/withdrawal";
import { Delegator } from "@/types/components/delegate";
import { ClubData } from "@/types/club";
import { getMyAdminClubs } from "@/api/club/api";
import { logout, unregister } from "@/api/login/api";

const WithDrawal = () => {
  const router = useRouter();
  const isSignIn = useUserStore(useShallow((state) => state.isSignIn));

  const [currentStep, setCurrentStep] = useState<number>(1);

  const [clubs, setClubs] = useState<ClubData[]>([]);
  const [selectedDelegates, setSelectedDelegates] = useState<
    Record<string, Delegator>
  >({}); // 클럽id, 위임자
  // 각 클럽마다 위임자 저장 (클럽 id, 위임자)

  const withdrawalMessage = "아리아리를 탈퇴합니다";
  const [inputValue, setInputValue] = useState<string>("");
  const [isInputValid, setIsInputValid] = useState<boolean>(true);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const confirmWithdrawal = async () => {
    try {
      await unregister();
      await logout();
      setCurrentStep(currentStep + 1);
    } catch (error) {
      setIsModalOpen(false);
      setCurrentStep(1);
      setAlertMessage("문제가 발생했습니다.");
    }
  };

  // currentStep이 4인 경우 2초뒤 홈으로 이동
  useEffect(() => {
    if (currentStep === 4) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [currentStep, router]);

  useEffect(() => {
    if (isSignIn) {
      getMyAdminClubs().then((res) => {
        setClubs(res.clubDataList);
      });
    }
  }, [isSignIn]);

  // 모바일 input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (isSubmitted) {
      setIsInputValid(value === withdrawalMessage);
    }
  };

  // 모바일 탈퇴하기 버튼 핸들러
  const handleSubmit = () => {
    if (!isSignIn) {
      setAlertMessage("로그인 후 다시 시도해 주세요.");
      return;
    }
    setIsSubmitted(true);
    if (inputValue === withdrawalMessage) {
      // 1단계인 경우
      if (currentStep === 1) {
        if (clubs.length > 0) {
          handleNextStep();
        } else {
          handleNext2Step();
        }
      }
      // 2단계인 경우
      if (currentStep === 2) {
        handleNextStep();
        setIsModalOpen(true);
      }
    } else {
      setIsInputValid(false);
    }
  };
  const handleClose = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (clubs.length > 0) {
        setCurrentStep(currentStep + 1);
      } else {
        handleNext2Step();
      }
    } else if (currentStep === 2) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3) {
      confirmWithdrawal();
    } else if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handleNext2Step = () => {
    setCurrentStep(currentStep + 2);
  };

  const handleDelegateSelection = (id: string, user: Delegator) => {
    setSelectedDelegates((prev) => ({
      ...prev,
      [id]: user,
    }));
  };

  return (
    <div className="mt-[46px] mb-20 md:mb-0">
      <HeaderSection />
      <div className="hidden gap-[22px] mt-6 md:flex md:flex-col md:mt-8 md:">
        <h1 className="text-text1 md:text-h1_contents_title">
          Ariari 탈퇴 안내
        </h1>
        <p className="text-subtext2 text-h4">
          Ariari 탈퇴 진행 전, 관련 사항들을 확인해주세요.
        </p>
      </div>
      <div className="flex flex-col gap-7 rounded-8 bg-background mt-5 mb-20 md:mb-[124px] md:mt-[22px] md:px-6 md:py-[26px] md:gap-10">
        <div className="flex flex-col gap-10 md:gap-12">
          {WITHDRAWAL_INFO.map((info, index) => (
            <div key={index}>
              <NoticeCard info={info} />
            </div>
          ))}
        </div>
        <div className="border-t border-menuborder"></div>
        <div>
          <p className="mb-2.5 text-text1 text-mobile_h3 md:text-h3">
            서비스 탈퇴하기
          </p>
          <p className="mb-3.5 text-mobile_body3_r md:text-body1_r text-subtext2 md:mb-6">
            아리아리 서비스 탈퇴시 가입, 개설한 동아리에서 탈퇴처리 되며 올린
            게시글과 댓글이 모두 삭제 되어 복구할 수 없습니다.
          </p>
          <div className="mb-3.5  md:hidden">
            <div className="w-full flex px-4 py-3 bg-searchbar text-mobile_body1_r text-subtext2 rounded-12 justify-between items-center">
              <input
                type="text"
                value={inputValue}
                placeholder={`'${withdrawalMessage}'라고 입력해 주세요.`}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
                className="grow shrink basis-0 bg-searchbar border-none outline-none"
              />
            </div>
            {isSubmitted && !isInputValid && (
              <div className="mt-1 ml-4 text-mobile_body3_r text-noti">
                올바른 내용이 아닙니다.
              </div>
            )}
          </div>
          {currentStep == 2 && (
            <div className="md:hidden">
              <div className="mb-3.5 text-mobile_h3">관리자 권한 위임</div>
              <div className="mb-3.5 text-mobile_body3_r text-[#7D8595]">
                회원님이 동아리 관리자로 있는 동아리가 있습니다. 관리자 권한을
                다른 사용자에게 위임해주세요.
              </div>
              <div className="flex flex-col gap-4 mb-5">
                {clubs.map((club) => (
                  <div key={club.id}>
                    <SelectAdministrator
                      club={club}
                      selectedUser={selectedDelegates[club.id] || null}
                      setSelectedUser={(name: string, id: string) => {
                        handleDelegateSelection(club.id, { name, id });
                        console.log(club.name, name, id);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="hidden md:flex">
            <SmallBtn
              title={"탈퇴하기"}
              onClick={() => {
                if (!isSignIn) {
                  setAlertMessage("로그인 후 다시 시도해 주세요.");
                  return;
                }
                setIsModalOpen(true);
              }}
            />
          </div>
          <div className="md:hidden">
            <LargeBtn title={"탈퇴하기"} onClick={handleSubmit} />
          </div>
        </div>
      </div>

      {(isModalOpen || currentStep > 1) && (
        <LeaveDialog
          step={currentStep}
          clubs={clubs}
          handleNextStep={handleNextStep}
          handleNext2Step={handleNext2Step}
          selectedDelegates={selectedDelegates}
          handleDelegateSelection={handleDelegateSelection}
          onClose={handleClose}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      )}

      {currentStep === 4 && <MobileSnackBar text={"탈퇴가 완료되었습니다"} />}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default WithDrawal;

import React from "react";

import SelectAdministrator from "@/components/card/selectAdministrator";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import { Delegator } from "@/types/components/delegate";
import { ClubData } from "@/types/club";

interface StepProps {
  clubs: ClubData[];
  selectedDelegates: Record<string, Delegator>;
  onDelegateSelect: (clubId: string, user: Delegator) => void;
  handleNextStep: () => void;
}
const Step3 = ({
  clubs,
  selectedDelegates,
  onDelegateSelect,
  handleNextStep,
}: StepProps) => {
  const description =
    "현재 관리자로 운영중인 동아리의 구성원을 직접 선택해\n관리자 권한을 위임할 수 있습니다";

  const handleSubmit = () => {
    handleNextStep();
  };
  return (
    <div className="hidden md:flex flex-col w-full justify-center pt-9 pb-[26px]">
      <p className="text-text1 text-h1_contents_title mb-4 text-center">
        관리자 권한 위임
      </p>
      <h3 className="text-center text-subtext1 text-h4_r mb-8 whitespace-pre">
        {description}
      </h3>
      <div className="mb-8 h-[300px] overflow-auto">
        {clubs.map((club, index) => (
          <div key={club.id}>
            <SelectAdministrator
              club={club}
              selectedUser={selectedDelegates[club.id] || null}
              setSelectedUser={(name: string, id: string) => {
                onDelegateSelect(club.id, { name, id });
              }}
            />
            {index !== clubs.length - 1 && (
              <div className="my-2 border-t border-menuborder"></div>
            )}
          </div>
        ))}
      </div>

      <LargeBtn title={"다음"} onClick={handleSubmit} />
      <button
        onClick={handleNextStep}
        className="block mx-auto mt-4 px-4 py-2.5 text-[13px] font-semibold text-primary md:text-[15px]"
      >
        건너뛰기
      </button>
    </div>
  );
};

export default Step3;

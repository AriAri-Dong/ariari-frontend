import { useState } from "react";

export const useApplyStatusOptions = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false); // 지원상태 변경 옵션 드롭다운/바텀시트
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 지원상태 변경 확인 모달
  const [isInterviewOpen, setIsInterviewOpen] = useState<boolean>(false); // 면접 확인 메세지 전송 모달
  const [isApplicationOpen, setIsApplicationOpen] = useState<boolean>(false); // 지원서 상세보기 모달

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsModalOpen(true);
  };

  return {
    isOptionsOpen,
    setIsOptionsOpen,
    handleOptionSelect,
    isModalOpen,
    setIsModalOpen,
    selectedOption,
    setSelectedOption,
    isInterviewOpen,
    setIsInterviewOpen,
    isApplicationOpen,
    setIsApplicationOpen,
  };
};

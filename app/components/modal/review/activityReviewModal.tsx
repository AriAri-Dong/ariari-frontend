import Image from "next/image";
import React, { useEffect, useState } from "react";
import close from "@/images/icon/close.svg";
import Alert from "@/components/alert/alert";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import CustomInput from "@/components/input/customInput";
import ReviewBadgeContainer from "@/components/badge/review/reviewBadgeContainer";
import { ActivityReviewProps } from "@/types/components/review";
import { TagData, TagIconType } from "@/types/review";
import { useSearchParams } from "next/navigation";
import { getClubTag } from "@/api/review/api";

const ActivityReviewModal = ({ onClose, onSubmit }: ActivityReviewProps) => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [tagData, setTagData] = useState<TagData[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagIconType[]>([]);

  const handleTagSelection = (tagIcon: TagIconType) => {
    if (selectedTags.includes(tagIcon)) {
      setSelectedTags(selectedTags.filter((item) => item !== tagIcon));
    } else {
      setSelectedTags([...selectedTags, tagIcon]);
    }
  };

  const validateForm = () => {
    if (!title.trim()) {
      setAlertMessage("활동후기 제목을 입력해주세요.");
      return false;
    }
    if (!body.trim()) {
      setAlertMessage("활동후기 내용을 입력해주세요.");
      return false;
    }
    if (selectedTags.length === 0) {
      setAlertMessage("좋았던 점을 최소 1개 이상 선택해주세요.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({ title, body, icons: selectedTags });
      onClose();
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
    getClubTag().then((res) => {
      setTagData(res);
    });
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
          <h1 className="text-text1 text-h1_contents_title">
            활동후기 작성하기
          </h1>
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

        {/* content 영역 (스크롤 가능한 영역) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <h3 className="flex text-text1 text-h3 mt-[22px] mb-[18px]">
            활동후기 제목
            <span className="text-noti text-body1_m pl-1">*</span>
          </h3>
          <CustomInput
            value={title}
            placeholder={"활동후기 제목을 작성해주세요"}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* 두 번째 문항 */}
          <div className="flex justify-between mt-7 mb-3 items-center">
            <h3 className="flex text-text1 text-h3">
              이런 점이 좋았어요
              <span className="text-noti text-body1_m pl-1">*</span>
            </h3>
          </div>
          <ReviewBadgeContainer
            tags={tagData}
            onTagSelect={handleTagSelection}
            selectedTags={selectedTags}
          />
          {/* 세 번째 문항 */}
          <div className="flex justify-between mt-7 mb-3 items-center">
            <h3 className="flex text-text1 text-h3">
              활동후기
              <span className="text-noti text-body1_m pl-1">*</span>
            </h3>
          </div>
          <div className="px-1">
            <textarea
              placeholder="동아리 분위기, 개인적 평가 등 자유롭게 할동 후기를 기재해 주세요."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={1000}
              className="w-full p-2 border-0 rounded-md resize-none text-body1_r 
                  text-subtext1 focus:outline-none focus:ring-[1px] 
                  focus:ring-searchbarborder placeholder:text-unselected
                    flex-1 min-h-[30vh] max-h-[40vh]"
            />
          </div>
        </div>
        {/* 하단 버튼 */}
        <div className="flex justify-end mt-6 pb-1">
          <SmallBtn title="등록하기" onClick={handleSubmit} />
        </div>
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ActivityReviewModal;

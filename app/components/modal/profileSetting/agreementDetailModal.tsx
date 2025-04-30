import SmallBtn from "@/components/button/basicBtn/smallBtn";

type AgreementDetailModalProps = {
  title: string;
  content: string;
  onClose: () => void;
};

const AgreementDetailModal = ({
  title,
  content,
  onClose,
}: AgreementDetailModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative w-[680px] px-5 pb-9 pt-[26px] bg-background rounded-2xl">
        <h1 className="text-h1_contents_title text-center text-text1">
          {title}
        </h1>
        <div className="bg-searchbar text-subtext1 rounded-12 overflow-y-auto p-5 h-[260px] my-9">
          {content}
        </div>
        <SmallBtn
          title={"확인했습니다."}
          onClick={onClose}
          className="flex justify-self-center"
        />
      </div>
    </div>
  );
};

export default AgreementDetailModal;

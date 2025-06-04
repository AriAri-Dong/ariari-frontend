import SmallBtn from "@/components/button/basicBtn/smallBtn";
import { NoticeItem } from "@/types/components/withdrawInfo";

type AgreementDetailModalProps = {
  title: string;
  content: string | NoticeItem[];
  onClose: () => void;
};

const AgreementDetailModal = ({
  title,
  content,
  onClose,
}: AgreementDetailModalProps) => {
  const isStructured = Array.isArray(content);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative w-[680px] px-5 pb-9 pt-[26px] bg-background rounded-2xl max-h-[90vh]">
        <h1 className="text-h1_contents_title text-center text-text1">
          {title}
        </h1>
        <div className="bg-searchbar text-subtext1 rounded-12 p-5 my-9 max-h-[260px] overflow-y-auto custom-scrollbar">
          {isStructured ? (
            (content as NoticeItem[]).map((item, idx) => (
              <div key={idx} className="mb-6">
                <h2 className="text-body1_sb mb-2">{item.title}</h2>
                {item.description && (
                  <p className="text-body3_m mb-2">{item.description}</p>
                )}
                <ul className="pl-5 space-y-1 text-subtext2 text-body4_r">
                  {item.sections.map((section, sIdx) => (
                    <li key={sIdx}>{section}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-sm whitespace-pre-wrap">{content}</p>
          )}
        </div>

        <div className="flex justify-center">
          <SmallBtn title="확인했습니다." onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default AgreementDetailModal;

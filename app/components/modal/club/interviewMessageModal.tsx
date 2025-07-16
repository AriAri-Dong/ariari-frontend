import Image from "next/image";
import close from "@/images/icon/close.svg";
import Contour from "@/components/bar/contour";

const InterviewMessageModal = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  return (
    <div
      id="background"
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50"
      onClick={(e) =>
        (e.target as HTMLDivElement).id === "background" && onClose()
      }
    >
      <div
        className={`bg-white p-5 shadow-modal rounded-2xl w-[826px] max-h-[90vh] flex flex-col`}
      >
        {/* header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-2">
            <h1 className="text-text1 text-h1_contents_title">
              면접 확인 안내
            </h1>
          </div>
          <Image
            src={close}
            alt={"닫기"}
            width={24}
            height={24}
            onClick={onClose}
            className="md:w-6 md:h-6 cursor-pointer"
          />
        </div>
        <Contour />
        {/* content */}
        <textarea
          defaultValue={message}
          maxLength={1000}
          className="w-full p-2 my-2 h-[700px] border-0 rounded-md resize-none text-body1_r 
                text-subtext1 focus:outline-none focus:ring-[1px]
                focus:ring-searchbarborder placeholder:text-unselected
                placeholder:whitespace-pre-wrap"
          style={{ whiteSpace: "pre-wrap" }}
          readOnly
        />
      </div>
    </div>
  );
};

export default InterviewMessageModal;

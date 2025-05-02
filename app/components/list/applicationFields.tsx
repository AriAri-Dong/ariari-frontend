import { BADGE_TITLE_MAP } from "@/constants/application";
import { ApplyDetailRes } from "@/types/application";
import PDFDownloadBtn from "../button/pdfDownloadBtn";
import FileBadge from "../badge/fileBadge";
import Link from "next/link";

interface ApplicationFieldsProps extends Omit<ApplyDetailRes, "applyData"> {
  name: string;
}

const ApplicationFields = ({
  name,
  applyAnswerDataList,
  specialAnswerList,
  fileUri,
  portfolioUrl,
}: ApplicationFieldsProps) => {
  return (
    <div className="flex flex-col gap-[30px] md:gap-10">
      {/* 뱃지 항목에 대한 답변 */}
      <ul className="flex flex-col md:gap-10 gap-[30px]">
        {Object.entries({ name: name, ...specialAnswerList })
          .filter(([_, value]) => value != null)
          .map(([name, value]) => (
            <li key={name} className="flex flex-col md:gap-3 gap-2">
              <p className="md:text-h3 text-mobile_h3">
                {name === "name" ? "이름" : BADGE_TITLE_MAP[name]}
              </p>
              <p className="md:text-body1_m text-mobile_body1_r text-subtext1">
                {value}
              </p>
            </li>
          ))}
      </ul>

      {/* 추가 선택 항목에 대한 답변 */}
      <ul className="flex flex-col md:gap-10 gap-[30px]">
        {applyAnswerDataList.map((answer) => (
          <li
            key={answer.applyQuestionData.id}
            className="flex flex-col md:gap-[18px] gap-[14px]"
          >
            <p className="md:text-h3 text-mobile_h3">
              {answer.applyQuestionData.body}
            </p>
            <p className="bg-searchbar text-subtext1 rounded-12 md:text-body1_r text-mobile_body1_r md:py-[14px] md:px-[22px] py-3 px-4">
              {answer.body}
            </p>
          </li>
        ))}
      </ul>

      {/* 포트폴리오(fileUri / portfolioUrl) */}
      <div className="flex flex-col md:gap-[18px] gap-[14px]">
        <p className="md:text-h3 text-mobile_h3">포트폴리오</p>
        <div className="flex flex-col gap-3">
          {fileUri && (
            <div className="flex gap-2 ">
              <FileBadge fileName={fileUri} />
              <PDFDownloadBtn
                file={fileUri}
                fileName={`${fileUri}_Portfolio`}
              />
            </div>
          )}
          {portfolioUrl && (
            <Link
              href={portfolioUrl}
              target="_blank"
              className="bg-searchbar text-subtext1 rounded-12 md:text-body1_r text-mobile_body1_r md:py-[14px] md:px-[22px] py-3 px-4 underline"
            >
              {portfolioUrl}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationFields;

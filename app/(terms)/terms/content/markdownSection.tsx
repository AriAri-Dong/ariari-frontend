import { getTerms } from "@/api/service/api";
import { TermType } from "@/types/service";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownSectionProps {
  termType: TermType;
}
const MarkdownSection = ({ termType }: MarkdownSectionProps) => {
  const [body, setBody] = useState("");

  useEffect(() => {
    getTerms(termType)
      .then((res) => {
        setBody(res.body);
      })
      .catch(() => {
        setBody("문제가 발생했습니다");
      });
  }, [termType]);

  return (
    <div className="prose max-w-none w-full">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
    </div>
  );
};
export default MarkdownSection;

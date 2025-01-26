import Image from "next/image";
import link from "@/images/icon/link.svg";

interface FileBadgeProps {
  fileName: string;
}

const FileBadge = ({ fileName }: FileBadgeProps) => {
  return (
    <div className="flex items-center gap-[6px] py-1 pl-2.5 pr-[14px] rounded bg-selectedoption_default">
      <Image
        src={link}
        alt={"링크"}
        width={20}
        height={20}
        className="w-6 h-6"
      />
      <p className="text-mobile_body1_m text-nowrap md:text-body1_m text-primary">
        {fileName}
      </p>
    </div>
  );
};

export default FileBadge;

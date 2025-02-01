import React from "react";
import Image from "next/image";
import download from "@/images/icon/download.svg";

interface PDFDownloadBtnProps {
  file: string;
  fileName: string;
}

const PDFDownloadBtn = ({ file, fileName }: PDFDownloadBtnProps) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = file;
    link.download = `${fileName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Image
      src={download}
      alt="다운로드"
      width={16}
      height={16}
      onClick={handleDownload}
      className="cursor-pointer md:w-6 md:h-6"
    />
  );
};

export default PDFDownloadBtn;

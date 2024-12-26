import snackbarIcon from "@/images/icon/snackbarIcon.svg";
import Image from "next/image";

interface MobileSnackBarProps {
  text: string;
}

/**
 *
 * @param {string} text snackBar에 표시될 텍스트
 * @returns
 */
const MobileSnackBar = ({ text }: MobileSnackBarProps) => {
  return (
    <div
      className="w-full fixed bottom-0 left-0 px-[17px] pb-5 md:hidden"
      style={{ zIndex: 1000 }}
    >
      <div className="flex items-center py-3 px-5 bg-subtext1 rounded-38">
        <Image src={snackbarIcon} alt={"check"} width={20} height={20} />
        <p className="text-mobile_body2_m text-background text-center flex-1 mr-5">
          {text}
        </p>
      </div>
    </div>
  );
};

export default MobileSnackBar;

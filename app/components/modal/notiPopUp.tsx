import React from "react";

import { StaticImageData } from "next/image";
import Image from "next/image";

import schoolIcon from "@/images/icon/popup/school.svg";
import pointIcon from "@/images/icon/popup/point.svg";
import loginIcon from "@/images/icon/popup/login.svg";
import notIcon from "@/images/icon/popup/not.svg";
import deleteIcon from "@/images/icon/popup/delete.svg";
import celebrationIcon from "@/images/icon/popup/celebration.svg";
import closeIcon from "@/images/icon/close.svg";

type ButtonModalProps = {
  modalType: "button";
  firstButton: () => void;
  firstButtonText: string;
  secondButton: () => void;
  secondButtonText: string;
};

type XButtonModalProps = {
  modalType: "x-button";
};

type NotiPopUpProps = {
  onClose: () => void;
  icon: "school" | "point" | "login" | "not" | "delete" | "celebration";
  title: string;
  description: string;
} & (ButtonModalProps | XButtonModalProps);

const NotiPopUp = (props: NotiPopUpProps) => {
  const { onClose, icon, title, description, modalType } = props;

  const iconMap: Record<NotiPopUpProps["icon"], StaticImageData> = {
    school: schoolIcon,
    point: pointIcon,
    login: loginIcon,
    not: notIcon,
    delete: deleteIcon,
    celebration: celebrationIcon,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-[306px] p-5 pt-[52px] bg-white rounded-2xl md:w-[430px] md:pt-[72px] md:pb-[26px] md:px-5">
        <div className="flex justify-center mb-8 md:mb-[46px]">
          <Image
            src={iconMap[icon]}
            alt={icon}
            className="w-[96px] h-[96px] md:w-[124px] md:h-[124px]"
          />
        </div>

        <div className="text-center">
          <h2 className="mb-[12px] text-mobile_h1_contents_title text-text1 md:text-h1_contents_title">
            {title}
          </h2>
          <p
            className="mb-7 text-mobile_body1_r text-subtext1 whitespace-pre md:mb-8 md:text-h4_r"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        {modalType === "button" ? (
          <div>
            <button
              onClick={props.firstButton}
              className="w-full py-[15px] mb-2 text-mobile_body1_sb bg-primary text-background rounded-lg hover:bg-primary_hover focus:bg-primary_pressed 
              md:py-[18px] md:mb-4 md:text-h4_sb"
            >
              {props.firstButtonText}
            </button>
            <button
              onClick={props.secondButton}
              className="block mx-auto px-4 py-2.5 text-mobile_body2_sb text-primary 
              md:text-body1_sb"
            >
              {props.secondButtonText}
            </button>
          </div>
        ) : (
          <button onClick={onClose} className="block mx-auto px-4 py-2">
            <Image src={closeIcon} alt="close" width={28} height={28} />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotiPopUp;

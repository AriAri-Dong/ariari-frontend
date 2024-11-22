import Image from "next/image";
import affiliation from "@/images/icon/affiliation.svg";
import region from "@/images/icon/region.svg";
import target from "@/images/icon/target.svg";
import field from "@/images/icon/field.svg";

const KEYWORD_LIST = [
  { id: 0, icon: affiliation, title: "소속" },
  { id: 1, icon: field, title: "분야" },
  { id: 2, icon: region, title: "지역" },
  { id: 3, icon: target, title: "대상" },
];

const Keyword = () => {
  return (
    <div className="w-full flex justify-between">
      {KEYWORD_LIST.map((item) => {
        return (
          <div key={item.id} className="flex flex-col space-y-2 items-center">
            <Image src={item.icon} alt={item.title} width={56} height={56} />
            <p className="text-subtext1 text-15 font-medium">{item.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Keyword;

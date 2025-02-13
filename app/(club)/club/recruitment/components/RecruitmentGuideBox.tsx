import { RECRUITMENT_GUIDE_DATA } from "@/data/recruitment";
import React from "react";

const Marker = ({ shape }: { shape: string }) => {
  return <span className="w-2">{shape}</span>;
};
const RecruitmentGuideBox = () => {
  return (
    <div className="space-y-4 md:overflow-y-scroll md:custom-scrollbar-with-bg h-full">
      {RECRUITMENT_GUIDE_DATA.map((section, index) => (
        <div key={index} className="space-y-1 text-subtext1">
          <h2 className="flex gap-2 text-mobile_h4_sb">
            <Marker shape={`${index + 1}.`} />
            {section.title}
          </h2>
          <ul className="list-inside">
            {section.content.map((item, idx) => (
              <li key={idx} className="text-mobile_body1_r md:ml-4">
                <div className="flex gap-2 ">
                  <Marker shape={"·"} />
                  <span>{`${item.title}`}</span>
                </div>
                {item.description && (
                  <ul className="list-inside ml-4">
                    {item.description.map((desc, i) => (
                      <li key={i} className="flex gap-2 text-mobile_body1_r">
                        <Marker shape={"·"} />
                        {`${desc}`}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RecruitmentGuideBox;

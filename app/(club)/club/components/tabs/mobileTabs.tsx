import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TABS = [
  { id: 1, label: "모집공고", url: "/club" },
  { id: 2, label: "지원서 양식 작성", url: "/club/create" },
  {
    id: 3,
    label: "지원현황",
    url: "/club/management/recruitment/applicationStatus",
  },
];

const Tabs = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(3);

  const handleTabClick = (tabId: number, url: string) => {
    setActiveTab(tabId);
    router.push(url);
  };

  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar whitespace-nowrap lg:hidden">
      {TABS.map((tab) => (
        <div className="flex flex-col gap-[6px]">
          <div
            key={tab.id}
            onClick={() => handleTabClick(tab.id, tab.url)}
            className={`flex-nowrap cursor-pointer text-mobile_body1_m ${
              activeTab === tab.id ? "text-primary" : "text-unselected"
            }`}
          >
            {tab.label}
          </div>
          {activeTab === tab.id && (
            <div
              className={`h-0.5 ${
                activeTab === tab.id ? "bg-primary" : "bg-unselected"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Tabs;

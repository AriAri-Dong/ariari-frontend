"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface TabProps {
  data: { id: number; label: string; url: string }[];
}

const Tabs = ({ data }: TabProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // URL과 일치하는 탭을 찾아 활성화
  const currentTab = data.find((tab) => tab.url === pathname);
  const [activeTab, setActiveTab] = useState<number>(
    currentTab?.id || data[0].id
  );

  useEffect(() => {
    // URL이 변경될 때 `activeTab`을 자동 업데이트
    const matchedTab = data.find((tab) => tab.url === pathname);
    if (matchedTab) {
      setActiveTab(matchedTab.id);
    }
  }, [pathname, data]);

  const handleTabClick = (tabId: number, url: string) => {
    setActiveTab(tabId);
    router.push(url);
  };

  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar whitespace-nowrap lg:hidden mb-5">
      {data.map((tab) => (
        <div key={tab.id} className="flex flex-col gap-[6px]">
          <div
            onClick={() => handleTabClick(tab.id, tab.url)}
            className={`flex-nowrap cursor-pointer text-mobile_body1_m ${
              activeTab === tab.id ? "text-primary" : "text-unselected"
            }`}
          >
            {tab.label}
          </div>
          {activeTab === tab.id && <div className="h-0.5 bg-primary" />}
        </div>
      ))}
    </div>
  );
};

export default Tabs;

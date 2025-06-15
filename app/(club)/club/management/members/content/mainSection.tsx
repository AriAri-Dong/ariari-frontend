"use client";

import { Suspense } from "react";
import ClubMemberContent from "./ClubMemberContent";

const ClubMemberMainSection = () => {
  return (
    <Suspense
      fallback={<div className="text-center p-10 text-subtext1">로딩중...</div>}
    >
      <ClubMemberContent />
    </Suspense>
  );
};

export default ClubMemberMainSection;

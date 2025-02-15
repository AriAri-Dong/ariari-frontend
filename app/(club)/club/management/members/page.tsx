"use client";

import { Suspense } from "react";
import ClubMemberContent from "./content/ClubMemberContent";

const ClubMemberPage = () => {
  return (
    <Suspense
      fallback={<div className="text-center p-10 text-subtext1">로딩중...</div>}
    >
      <ClubMemberContent />
    </Suspense>
  );
};

export default ClubMemberPage;

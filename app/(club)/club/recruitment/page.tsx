"use client";

import React, { Suspense } from "react";

import ClubRecruitmentContent from "./content/clubRecruitmentContent";

const ClubRecruitmentPage = () => {
  return (
    <Suspense
      fallback={<div className="text-center p-10 text-subtext1">로딩중...</div>}
    >
      <ClubRecruitmentContent />
    </Suspense>
  );
};

export default ClubRecruitmentPage;

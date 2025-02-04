// app/recruitment/detail/page.tsx
import React, { Suspense } from "react";
import RecruitmentDetail from "./content/recruitmentDetail";

export default function RecruitmentDetailPage() {
  return (
    <Suspense
      fallback={<h4 className="w-full text-center text-h4">로딩 중...</h4>}
    >
      <RecruitmentDetail />
    </Suspense>
  );
}

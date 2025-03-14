"use client";

import React, { Suspense } from "react";
import RecruitmentDetail from "./content/recruitmentDetail";
import Loading from "@/components/feedback/loading";

export default function RecruitmentDetailPage() {
  return (
    <Suspense fallback={<Loading />}>
      <RecruitmentDetail />
    </Suspense>
  );
}

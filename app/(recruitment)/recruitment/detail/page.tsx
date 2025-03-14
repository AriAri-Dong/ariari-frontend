"use client";

import React, { Suspense } from "react";
import Loading from "@/components/feedback/loading";
import dynamic from "next/dynamic";

const RecruitmentDetail = dynamic(() => import("./content/recruitmentDetail"), {
  loading: () => <Loading />,
  ssr: false,
});

export default function RecruitmentDetailPage() {
  return (
    <Suspense fallback={<Loading />}>
      <RecruitmentDetail />
    </Suspense>
  );
}

"use client";

import React, { Suspense } from "react";
import Loading from "@/components/feedback/loading";
import dynamic from "next/dynamic";

const Application = dynamic(() => import("./content/application"), {
  loading: () => <Loading />,
  ssr: false,
});

export default function ApplicationPage() {
  return (
    <Suspense fallback={<></>}>
      <Application />
    </Suspense>
  );
}

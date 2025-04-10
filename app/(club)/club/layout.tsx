"use client";


import React, { Suspense, useEffect } from "react";
import { ClubProvider } from "@/context/ClubContext";
import dynamic from "next/dynamic";
import Loading from "@/components/feedback/loading";

const ClubPage = dynamic(() => import("./clubPage"), {
  loading: () => <Loading />,
  ssr: false,
});

const ClubPageWithProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClubProvider>
      <Suspense fallback={<Loading />}>
        <ClubPage>{children}</ClubPage>
      </Suspense>
    </ClubProvider>
  );
};

export default ClubPageWithProvider;

"use client";

import React, { Suspense, useEffect } from "react";
import { ClubProvider, useClubContext } from "@/context/ClubContext";
import Loading from "@/components/feedback/loading";
import dynamic from "next/dynamic";


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

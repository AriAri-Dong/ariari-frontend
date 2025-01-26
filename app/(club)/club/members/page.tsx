"use client";

import React from "react";
import ClubMembersSection from "./content/clubMembersSection";

const ClubMemberPage = () => {
  return (
    <div>
      {/* === 공통 영역 === */}
      <div className="bg-background flex justify-center items-center w-full">
        <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx">
          {/* <ClubInfoSection /> */}
        </div>
      </div>
      <ClubMembersSection />
    </div>
  );
};

export default ClubMemberPage;

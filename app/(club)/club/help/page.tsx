"use client";

import React from "react";
import ClubInfoSection from "../content/clubInfoSection";
import ClubQuestionSection from "./content/clubQuestionSection";

const ClubHelpPage = () => {
  return (
    <div>
      {/* === 공통 영역 === */}
      <div className="bg-background flex justify-center items-center w-full">
        <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:px-5">
          <ClubInfoSection />
        </div>
      </div>
      <ClubQuestionSection />
    </div>
  );
};

export default ClubHelpPage;

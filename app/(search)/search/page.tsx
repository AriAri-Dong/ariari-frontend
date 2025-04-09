"use client";

import { Suspense } from "react";
import MainSection from "./content/mainSection";

const SearchPage = () => {
  return (
    <Suspense>
      <MainSection />
    </Suspense>
  );
};

export default SearchPage;

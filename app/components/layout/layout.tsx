"use client";

import { useState } from "react";
import SearchTermContext from "@/context/searchTermContext";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  return (
    <SearchTermContext.Provider value={{ searchTerm, setSearchTerm }}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex justify-center items-center">
          <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:px-5">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </SearchTermContext.Provider>
  );
};

export default Layout;

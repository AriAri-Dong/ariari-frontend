"use client";

import { useState } from "react";
import MobileButtons from "../components/buttons/mobile_Buttons";
import PcButtons from "../components/buttons/PC_Buttons";

const TestPage = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  return (
    <div>
      <button
        className="py-2 px-4 mb-3 bg-pink-400 text-white rounded-lg hover:bg-pink-500"
        onClick={() => setIsButtonVisible(!isButtonVisible)}
      >
        {isButtonVisible
          ? "Hidden Button Components"
          : "Show Button Components"}
      </button>
      {isButtonVisible && (
        <div className="bg-pink-100 p-3">
          <PcButtons />
          <MobileButtons />
        </div>
      )}
    </div>
  );
};

export default TestPage;

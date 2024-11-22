import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      fontSize: {
        19: "19px",
        15: "15px",
        13: "13px",
        10: "10px",
      },
      colors: {
        background: "#fff",
        text1: "#000",
        subtext1: "#4B4F52",
        subtext2: "#7D8595",
        unselected: "#A1A6B0",
        icon: "#777F90",
        menuborder: "#E3E3E3",
        hover: "#F4F6FA",
        pressed: "#E8EBF1",
        searchbar: "#F2F4F6",
        searchbarborder: "#7495B6",
        primary_hover: "#4188EB",
        primary_pressed: "#4080DB",
        pulldownmenutext: "#404040",
        primary: "#589BFF",
        sub1: "#93BEFF",
        sub2: "#8A84FE",
        point: "#D1F75D",
        button1: "#d4dbe5",
        button2: "#c6d4e8",
        button3: "#bfd1e8",
        button_border: "#889cd6",
        black_50: "rgba(0, 0, 0, 0.5)",
        aelectedoption_default: "rgba(88, 155, 255, 0.1)",
        aelectedoption_hover: "rgba(88, 155, 255, 0.2)",
        aelectedoption_pressed: "rgba(88, 155, 255, 0.26)",
      },
      boxShadow: {
        default: "2px 2px 12px 0px rgba(0, 0, 0, 0.12)",
        border: "0px -3px 20px 0px rgba(0, 0, 0, 0.05)",
      },
      screens: {
        sm: "360px",
        md: "768px",
        lg: "1024px",
        lx: "1288px",
      },
      borderRadius: {
        28: "28px",
        30: "30px",
        60: "60px",
      },
    },
  },
  plugins: [
    function (pluginAPI: PluginAPI) {
      pluginAPI.addUtilities({
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
};
export default config;

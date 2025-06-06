import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";
import typography from "@tailwindcss/typography";

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
      colors: {
        background: "#fff",
        sub_bg: "rgba(242, 244, 246, 0.75)",
        white70: "rgba(255, 255, 255, 0.70)",
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
        primary: "#589BFF",
        primary_hover: "#4188EB",
        primary_pressed: "#4080DB",
        pulldownmenutext: "#404040",
        sub1: "#93BEFF",
        sub2: "#8A84FE",
        point: "#D1F75D",
        button1: "#d4dbe5",
        button2: "#c6d4e8",
        button3: "#bfd1e8",
        button_border: "#889cd6",
        noti: "#FF3E3E",
        black_50: "rgba(0, 0, 0, 0.5)",
        token_bg: "rgba(166, 166, 166, 0.2)",
        token_1: "#FA6B48",
        token_1_bg: "rgba(250, 107, 72, 0.2)",
        token_2: "#FABB48",
        token_2_bg: "rgba(250, 187, 72, 0.2)",
        token_3: "#36BBB6",
        token_3_bg: "rgba(54, 187, 182, 0.2)",
        token_4: "#58BBF8",
        token_4_bg: "rgba(88, 187, 248, 0.2)",
        // token - sub2와 동일
        sub2_bg: "rgba(138, 132, 254, 0.2)",
        // token - primary과 동일
        // token_bg -selecteoption_hover와 동일
        token_6: "#BE69F6",
        token_6_bg: "rgba(190, 105, 246, 0.2)",
        token_7: "#FF93FB",
        token_7_bg: "rgba(255, 147, 251, 0.2)",
        selectedoption_default: "rgba(88, 155, 255, 0.1)",
        selectedoption_hover: "rgba(88, 155, 255, 0.2)",
        selectedoption_pressed: "rgba(88, 155, 255, 0.26)",
        selectedoption_border: "rgba(88, 155, 255, 0.70)",
      },
      boxShadow: {
        default: "2px 2px 12px 0px rgba(0, 0, 0, 0.12)",
        border: "0px -3px 20px 0px rgba(0, 0, 0, 0.05)",
        modal: "0px -6px 30px 0px rgba(0, 0, 0, 0.08)",
      },
      screens: {
        sm: "360px",
        smm: "400px",
        sm_md: "668px",
        md: "768px",
        lg: "1024px",
        lx: "1288px",
      },
      borderRadius: {
        8: "8px",
        12: "12px",
        16: "16px",
        20: "20px",
        24: "24px",
        28: "28px",
        30: "30px",
        36: "36px",
        38: "38px",
        48: "48px",
        56: "56px",
        60: "60px",
      },
      fontSize: {
        8: "8px",
        28: "28px",
        19: "19px",
        15: "15px",
        13: "13px",
        10: "10px",
        h1_contents_title: ["24px", { fontWeight: 600 }],
        h2: ["21px", { fontWeight: 600 }],
        h3: ["18px", { fontWeight: 600, lineHeight: "27px" }],
        h4: ["16px", { fontWeight: 500, lineHeight: "24px" }],
        h4_r: ["16px", { fontWeight: 400, lineHeight: "24px" }],
        h4_sb: ["16px", { fontWeight: 600, lineHeight: "24px" }],
        body1_r: ["15px", { fontWeight: 400, lineHeight: "150%" }],
        body1_m: ["15px", { fontWeight: 500, lineHeight: "22.5px" }],
        body1_sb: ["15px", { fontWeight: 600, lineHeight: "21px" }],
        body2_r: ["14px", { fontWeight: 400, lineHeight: "21px" }],
        body2_m: ["14px", { fontWeight: 500, lineHeight: "21px" }],
        body3_r: ["13px", { fontWeight: 400, lineHeight: "18px" }],
        body3_m: ["13px", { fontWeight: 500, lineHeight: "19.5px" }],
        body4_r: ["12px", { fontWeight: 400 }],
        mobile_h1_contents_title: ["18px", { fontWeight: 600 }],
        mobile_h1_sb: ["14px", { fontWeight: 600, lineHeight: "21px" }],
        mobile_h2: ["17px", { fontWeight: 600 }],
        mobile_h3: ["16px", { fontWeight: 600, lineHeight: "150%" }],
        mobile_h4: ["15px", { fontWeight: 500, lineHeight: "150%" }],
        mobile_h4_r: ["15px", { fontWeight: 400, lineHeight: "150%" }],
        mobile_h4_sb: ["15px", { fontWeight: 600, lineHeight: "150%" }],
        mobile_body1_r: ["14px", { fontWeight: 400, lineHeight: "150%" }],
        mobile_body1_m: ["14px", { fontWeight: 500, lineHeight: "150%" }],
        mobile_body1_sb: ["14px", { fontWeight: 600, lineHeight: "150%" }],
        mobile_body2_r: ["13px", { fontWeight: 400, lineHeight: "150%" }],
        mobile_body2_m: ["13px", { fontWeight: 500, lineHeight: "150%" }],
        mobile_body2_sb: ["13px", { fontWeight: 600, lineHeight: "150%" }],
        mobile_body3_r: ["12px", { fontWeight: 400, lineHeight: "150%" }],
        mobile_body3_m: ["12px", { fontWeight: 500, lineHeight: "150%" }],
        mobile_body3_sb: ["12px", { fontWeight: 600, lineHeight: "150%" }],
        mobile_body4_r: ["11px", { fontWeight: 500, lineHeight: "150%" }],
      },
      keyframes: {
        dropdown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        dropdown: "dropdown 0.2s ease-out",
      },
    },
  },
  plugins: [
    typography,
    function (pluginAPI: PluginAPI) {
      pluginAPI.addUtilities({
        ".custom-scrollbar": {
          "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#BFC4CE",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#ABB0BA",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#fff",
            borderRadius: "4px",
          },
        },
        ".custom-scrollbar-with-bg": {
          "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ABB0BA",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#A1A6B0",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#F2F4F6",
            borderRadius: "4px",
          },
        },
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

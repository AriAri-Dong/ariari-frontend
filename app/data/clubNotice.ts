import test1 from "@/images/test/test1.png";
import test2 from "@/images/test/test2.png";
import test3 from "@/images/test/test3.png";
import test4 from "@/images/test/test4.png";
import test5 from "@/images/test/test5.png";
import test6 from "@/images/test/test6.png";
import test7 from "@/images/test/test7.png";
import test8 from "@/images/test/test8.png";

export const NOTICE_DATA = [
  {
    id: "1",
    title: "첫 번째 공지사항",
    text: "이건 내용입니다!",
    userName: "백설공주",
    imageUrls: [test8, test7],
  },
  {
    id: "2",
    title: "두 번째 공지사항",
    text: "이건 내용입니다!",
    userName: "병아리",
    imageUrls: [
      test1,
      test2,
      test3,
      test4,
      test5,
      test6,
      test1,
      test4,
      test5,
      test6,
    ],
  },
  {
    id: "3",
    title: "세 번째 공지사항",
    text: "이건 내용입니다!",
    userName: "엘사",
    imageUrls: [],
  },
  {
    id: "4",
    title: "모두들 독감 조심",
    text: "요즘 독감이 너무 심합니다... 마스크 필수!",
    userName: "안나",
    imageUrls: [test5, test6, test1, test4, test5, test6],
  },
];

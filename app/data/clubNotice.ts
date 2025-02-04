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
    date: "2024.05.06",
    text: "이건 내용입니다!",
    userName: "백설공주",
    imageUrls: [test8, test7],
    pin: false,
  },
  {
    id: "2",
    title: "두 번째 공지사항",
    date: "2024.01.16",
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
    pin: false,
  },
  {
    id: "3",
    title: "세 번째 공지사항",
    date: "2024.03.04",
    text: "이건 내용입니다!",
    userName: "엘사",
    imageUrls: [],
    pin: false,
  },
  {
    id: "4",
    title: "모두들 독감 조심",
    date: "2024.02.14",
    text: "요즘 독감이 너무 심합니다... 마스크 필수!",
    userName: "안나",
    imageUrls: [test5, test6, test1, test4, test5, test6],
    pin: true,
  },
  {
    id: "5",
    title: "테스트입니다. 확인해주세요.",
    date: "2024.02.22",
    text: "어떤 내용을 써야할까 긴 내용 테스트 긴 내용 테스트 이건 공지사항입니다. 긴 내용 공지사항을 테스트 중입니다. 테스트 입니다. ui 테스트입니다. ",
    userName: "숯이",
    imageUrls: [test1],
    pin: true,
  },
  {
    id: "6",
    title: "한파 주의보!!!",
    date: "2024.04.30",
    text: "이건 내용입니다!",
    userName: "엘사",
    imageUrls: [],
    pin: true,
  },
];

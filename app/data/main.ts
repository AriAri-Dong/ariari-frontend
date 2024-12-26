import { MainRecruitmentCardProps } from "@/types/components/card";
import test_image from "@/images/test/test_image.jpg";

export const MAIN_RECRUITMENT_CARD: MainRecruitmentCardProps[] = [
  {
    date: "2025-01-04",
    clubName: "아리아리",
    title: "원하는 웹 페이지를 만들어봐",
    imageUrl: test_image,
    tag: {
      affiliation: "아리아리",
      field: "웹개발",
      region: "서울",
      target: "대학생",
    },
    isScrap: true,
  },
  {
    date: "2024-12-31",
    clubName: "Coding Club",
    title: "Frontend Developer Wanted",
    imageUrl: test_image,
    tag: {
      affiliation: "University",
      field: "IT",
      region: "Seoul",
      target: "Students",
    },
    isScrap: false,
  },
  {
    date: "2024-11-30",
    clubName: "미술 동아리",
    title: "Graphic Designer Internship",
    imageUrl: test_image,
    tag: {
      affiliation: "스타트업",
      field: "개발",
      region: "서울",
      target: "대학생",
    },
    isScrap: false,
  },
  {
    date: "2024-12-25",
    clubName: "Design Club",
    title: "Graphic Designer Internship",
    imageUrl: test_image,
    tag: {
      affiliation: "스타트업",
      field: "디자인",
      region: "부산",
      target: "직장인",
    },
    isScrap: false,
  },
  {
    date: "2024-12-30",
    clubName: "프로그래밍밍밍",
    title: "같이 코딩 하자",
    imageUrl: test_image,
    tag: {
      affiliation: "스타트업",
      field: "개발",
      region: "인천",
      target: "Graduates",
    },
    isScrap: false,
  },
  {
    date: "2025-01-04",
    clubName: "아리아리",
    title: "원하는 웹 페이지를 만들어봐",
    imageUrl: test_image,
    tag: {
      affiliation: "아리아리",
      field: "웹개발",
      region: "서울",
      target: "대학생",
    },
    isScrap: false,
  },
];

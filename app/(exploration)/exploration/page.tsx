import ClubInfoCard from "@/components/card/clubInfoCard";
import test_image from "@/images/logo/ariari.svg";
import test_image2 from "@/images/icon/region.svg";
import test_image3 from "@/images/icon/target.svg";

export const CLUB_PROFILE_DATA = [
  {
    clubName: "동아리 A",
    clubImage: test_image,
    affiliation: "대학 동아리",
    field: "프로그래밍",
    region: "서울",
    target: "대학생",
    heartNumber: 25,
  },
  {
    clubName: "동아리 B",
    clubImage: test_image2,
    affiliation: "대학 동아리",
    field: "디자인",
    region: "부산",
    target: "대학생",
    heartNumber: 15,
  },
  {
    clubName: "동아리 C",
    clubImage: test_image,
    affiliation: "직장 동아리",
    field: "요리",
    region: "대구",
    target: "직장인",
    heartNumber: 8,
  },
  {
    clubName: "동아리 D",
    clubImage: test_image,
    affiliation: "청소년 동아리",
    field: "축구",
    region: "인천",
    target: "청소년",
    heartNumber: 30,
  },
  {
    clubName: "동아리 E",
    clubImage: test_image,
    affiliation: "학교 동아리",
    field: "음악",
    region: "광주",
    target: "고등학생",
    heartNumber: 12,
  },
  {
    clubName: "동아리 F",
    clubImage: test_image3,
    affiliation: "지역 동아리",
    field: "봉사",
    region: "대전",
    target: "성인",
    heartNumber: 20,
  },
  {
    clubName: "동아리 G",
    clubImage: test_image,
    affiliation: "대학 동아리",
    field: "사진",
    region: "서울",
    target: "대학생",
    heartNumber: 18,
  },
  {
    clubName: "동아리 H",
    clubImage: test_image,
    affiliation: "직장 동아리",
    field: "헬스",
    region: "부산",
    target: "직장인",
    heartNumber: 10,
  },
  {
    clubName: "동아리 I",
    clubImage: test_image,
    affiliation: "청소년 동아리",
    field: "독서",
    region: "대구",
    target: "청소년",
    heartNumber: 5,
  },
  {
    clubName: "동아리 J",
    clubImage: test_image,
    affiliation: "학교 동아리",
    field: "댄스",
    region: "인천",
    target: "고등학생",
    heartNumber: 22,
  },
  {
    clubName: "동아리 K",
    clubImage: test_image,
    affiliation: "대학 동아리",
    field: "마케팅",
    region: "서울",
    target: "대학생",
    heartNumber: 19,
  },
  {
    clubName: "동아리 L",
    clubImage: test_image,
    affiliation: "지역 동아리",
    field: "봉사",
    region: "광주",
    target: "성인",
    heartNumber: 25,
  },
  {
    clubName: "동아리 M",
    clubImage: test_image,
    affiliation: "학교 동아리",
    field: "미술",
    region: "대전",
    target: "고등학생",
    heartNumber: 9,
  },
  {
    clubName: "동아리 N",
    clubImage: test_image,
    affiliation: "대학 동아리",
    field: "음악",
    region: "부산",
    target: "대학생",
    heartNumber: 11,
  },
  {
    clubName: "동아리 O",
    clubImage: test_image,
    affiliation: "직장 동아리",
    field: "비즈니스",
    region: "대구",
    target: "직장인",
    heartNumber: 16,
  },
  {
    clubName: "동아리 P",
    clubImage: test_image,
    affiliation: "청소년 동아리",
    field: "농구",
    region: "인천",
    target: "청소년",
    heartNumber: 13,
  },
  {
    clubName: "동아리 Q",
    clubImage: test_image,
    affiliation: "학교 동아리",
    field: "영어",
    region: "광주",
    target: "고등학생",
    heartNumber: 21,
  },
  {
    clubName: "동아리 R",
    clubImage: test_image3,
    affiliation: "대학 동아리",
    field: "프로그래밍",
    region: "서울",
    target: "대학생",
    heartNumber: 28,
  },
  {
    clubName: "동아리 S",
    clubImage: test_image,
    affiliation: "직장 동아리",
    field: "골프",
    region: "부산",
    target: "직장인",
    heartNumber: 14,
  },
  {
    clubName: "동아리 T",
    clubImage: test_image,
    affiliation: "청소년 동아리",
    field: "토론",
    region: "대구",
    target: "청소년",
    heartNumber: 7,
  },
];

const Exploration = () => {
  return (
    <div>
      <h1>동아리 탐색</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CLUB_PROFILE_DATA.map((club) => (
          <ClubInfoCard
            key={club.clubName}
            clubName={club.clubName}
            clubImage={club.clubImage}
            affiliation={club.affiliation}
            field={club.field}
            region={club.region}
            target={club.target}
            heartNumber={club.heartNumber}
          />
        ))}
      </div>
    </div>
  );
};

export default Exploration;
``;

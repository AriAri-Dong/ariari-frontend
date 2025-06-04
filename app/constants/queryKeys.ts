export const QUERY_KEYS = {
  myApplyList: "myApplyList",
  myApplyTmpList: "myApplyTmpList",
  myClubList: "myClubList",

  clubEventList: (clubId: string) => ["clubEventList", clubId],

  recruitmentDetail: (recruitmentId: string) => [
    "recruitmentDetail",
    recruitmentId,
  ],

  clubActiveRecruitment: (clubId: string) => ["clubActiveRecruitment", clubId],
  clubRecruitmentList: (clubId: string) => ["clubRecruitmentList", clubId],
};

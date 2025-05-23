export const QUERY_KEYS = {
  myApplyList: "myApplyList",
  myApplyTmpList: "myApplyTmpList",

  clubEventList: (clubId: string) => ["clubEventList", clubId],

  recruitmentDetail: (recruitmentId: string) => [
    "recruitmentDetail",
    recruitmentId,
  ],

  clubActiveRecruitment: (clubId: string) => ["clubActiveRecruitment", clubId],
};

export const QUERY_KEYS = {
  myApplyList: "myApplyList",
  myApplyTmpList: "myApplyTmpList",

  recruitmentDetail: (recruitmentId: string) => [
    "recruitmentDetail",
    recruitmentId,
  ],
};

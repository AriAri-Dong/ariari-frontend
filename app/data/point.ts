import { ListSectionProps } from "@/types/components/point";

export const POINT_DATA_LIST: ListSectionProps[] = [
  { date: "2024-01-01", title: "회원 가입 했으니까", point: 50 },
  { date: "2024-02-14", title: "동아리 가입했으니까 줌", point: 15 },
  { date: "2024-05-19", title: "동아리 출석 안했으니까 뺐음", point: -5 },
  { date: "2024-03-04", title: "회원가입 했으니까 줌", point: 20 },
  { date: "2024-03-01", title: "동아리 후기 조회했으니까 뺐음", point: -10 },
  { date: "2024-01-01", title: "리뷰 작성했으니까 줌", point: 10 },
  { date: "2024-02-14", title: "동아리 가입했으니까 줌", point: 15 },
  { date: "2024-05-19", title: "동아리 출석 안했으니까 뺐음", point: -5 },
  { date: "2024-03-04", title: "회원가입 했으니까 줌", point: 20 },
  { date: "2024-03-01", title: "동아리 후기 조회했으니까 뺐음", point: -10 },
  { date: "2024-01-01", title: "리뷰 작성했으니까 줌", point: 10 },
  { date: "2024-02-14", title: "동아리 가입했으니까 줌", point: 15 },
  { date: "2024-05-19", title: "동아리 출석 안했으니까 뺐음", point: -5 },
  { date: "2024-03-04", title: "회원가입 했으니까 줌", point: 20 },
  { date: "2024-03-01", title: "동아리 후기 조회했으니까 뺐음", point: -10 },
  { date: "2024-01-01", title: "리뷰 작성했으니까 줌", point: 10 },
  { date: "2024-02-14", title: "동아리 가입했으니까 줌", point: 15 },
  { date: "2024-05-19", title: "동아리 출석 안했으니까 뺐음", point: -5 },
  { date: "2024-03-04", title: "그냥 줌", point: 20 },
  { date: "2024-03-01", title: "그냥 뺐음", point: -10 },
  { date: "2024-01-01", title: "리뷰 작성했으니까 줌", point: 10 },
  { date: "2024-02-14", title: "동아리 가입했으니까 줌", point: 15 },
  { date: "2024-05-19", title: "동아리 출석 안했으니까 뺐음", point: -5 },
  { date: "2024-03-04", title: "매일 출석 체크 했으니까 줌", point: 20 },
  { date: "2024-03-01", title: "동아리 후기 조회했으니까 뺐음", point: -10 },
  { date: "2024-01-01", title: "리뷰 작성했으니까 줌", point: 10 },
  { date: "2024-02-14", title: "동아리 가입했으니까 줌", point: 15 },
  { date: "2024-05-19", title: "동아리 출석 안했으니까 뺐음", point: -5 },
  { date: "2024-03-04", title: "회원가입 했으니까 줌", point: 20 },
  { date: "2024-03-01", title: "동아리 후기 조회했으니까 뺐음", point: -10 },
  { date: "2024-01-01", title: "리뷰 작성했으니까 줌", point: 10 },
  { date: "2024-02-14", title: "동아리 가입했으니까 줌", point: 15 },
  { date: "2024-05-19", title: "동아리 출석 안했으니까 뺐음", point: -5 },
  { date: "2024-03-04", title: "회원가입 했으니까 줌", point: 20 },
  { date: "2024-03-01", title: "동아리 후기 조회했으니까 뺐음", point: -10 },
];



export interface DayFloatingBarProps {
  deductionPoint:number
  currentPoint: number
}
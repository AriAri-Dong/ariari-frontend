import { CLUBS } from "@/api/apiUrl";
import axiosInstance from "@/api/axiosInstance";

// 동아리 상세 회비 내역 현재 잔액 조회
export const getClubFinanceBalance = async (clubId: string) => {
  try {
    const res = await axiosInstance.get<number>(
      `${CLUBS}/${clubId}/financial-records/balance`
    );
    console.log("get club finance balance res", res);
    return res.data;
  } catch (error) {
    console.log("failted to get club finance balance", error);
    throw error;
  }
};

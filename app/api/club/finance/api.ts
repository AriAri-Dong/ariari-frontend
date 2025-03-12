import { CLUBS } from "@/api/apiUrl";
import axiosInstance from "@/api/axiosInstance";
import { Pageable } from "@/types/api";
import { MembershipBalanceRes } from "@/types/club";

// 동아리 상세 회비 현재 잔액 조회
export const getClubFinanceBalance = async (clubId: string) => {
  try {
    const res = await axiosInstance.get<number>(
      `${CLUBS}/${clubId}/financial-records/balance`
    );
    console.log("get club finance balance res", res);
    return res.data;
  } catch (error) {
    console.log("failed to get club finance balance", error);
    throw error;
  }
};

// 동아리 상세 회비 내역 조회
export const getClubFinancialRecords = async (
  clubId: string,
  page: Pageable["page"]
) => {
  try {
    const res = await axiosInstance.get<MembershipBalanceRes>(
      `${CLUBS}/${clubId}/financial-records`,
      {
        params: {
          page,
          size: 10,
        },
      }
    );
    console.log("get club financial records", res);
    return res.data;
  } catch (error) {
    console.log("failed to get club financial records", error);
    return {
      financialRecordDataList: [],
      pageInfo: { contentSize: 0, totalSize: 0, totalPages: 0 },
    };
  }
};

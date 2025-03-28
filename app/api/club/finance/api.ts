import { CLUBS } from "@/api/apiUrl";
import axiosInstance from "@/api/axiosInstance";
import { Pageable } from "@/types/api";
import { MembershipBalance, MembershipBalanceRes } from "@/types/club";

// 동아리 상세 회비 현재 잔액 조회
export const getClubFinanceBalance = async (clubId: string) => {
  try {
    const res = await axiosInstance.get<number>(
      `${CLUBS}/${clubId}/financial-records/balance`
    );
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
    return res.data;
  } catch (error) {
    console.log("failed to get club financial records", error);
    return {
      financialRecordDataList: [],
      pageInfo: { contentSize: 0, totalSize: 0, totalPages: 0 },
    };
  }
};

// 동아리 회비 내역 등록(role- ADMIN, MANAGER)
export const addFinancialRecord = async ({
  clubId,
  data,
}: {
  clubId: string;
  data: Pick<MembershipBalance, "amount" | "body" | "recordDateTime">;
}) => {
  try {
    const res = await axiosInstance.post(
      `${CLUBS}/${clubId}/financial-records`,
      data
    );
    return res;
  } catch (error) {
    console.log("add financial record error", error);
    throw error;
  }
};

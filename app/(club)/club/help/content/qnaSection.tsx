import { useClubQnaQuery } from "@/hooks/club/useClubHelpQuery";
import { useSearchParams } from "next/navigation";
import QuestionDropdown from "../components/questionDropdown";
import { useClubContext } from "@/context/ClubContext";
import { useEffect, useState } from "react";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";

const QnaSection = ({
  onListCount,
}: {
  onListCount: (cnt: number) => void;
}) => {
  const [selectedQna, setSelectedQna] = useState<number | null>(null);

  const params = useSearchParams();
  const clubId = params.get("clubId") ?? "";
  const { clubInfo, role } = useClubContext();

  const {
    qnaList,
    totalSize,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
  } = useClubQnaQuery(clubId);

  useEffect(() => {
    onListCount(totalSize);
  }, [totalSize]);

  return (
    <>
      {qnaList.map((item, index) => (
        <div key={index} className="mb-2.5">
          <QuestionDropdown
            data={item}
            myRoleType={role}
            myProfileType={clubInfo?.clubMemberData.profileType}
            isOpen={item.id == selectedQna}
            setSelected={setSelectedQna}
          />
        </div>
      ))}
      {hasNextPage && (
        <div className="flex justify-center mt-9 md:mt-10">
          <PlusBtn title={"더보기"} onClick={() => fetchNextPage()} />
        </div>
      )}
    </>
  );
};

export default QnaSection;

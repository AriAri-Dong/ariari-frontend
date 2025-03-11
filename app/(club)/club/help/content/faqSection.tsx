import { useClubFaqQuery } from "@/hooks/club/useClubHelpQuery";
import { useSearchParams } from "next/navigation";
import QuestionDropdown from "../components/questionDropdown";
import { useClubContext } from "@/context/ClubContext";
import { useEffect, useState } from "react";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";

const FaqSection = ({
  onListCount,
}: {
  onListCount: (cnt: number) => void;
}) => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const params = useSearchParams();
  const clubId = params.get("clubId") ?? "";

  const { clubInfo, role } = useClubContext();

  const {
    faqList,
    totalSize,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
  } = useClubFaqQuery(clubId);

  useEffect(() => {
    onListCount(totalSize);
  }, [totalSize]);

  return (
    <>
      {faqList?.map((item, index) => (
        <div key={index} className="mb-2.5">
          <QuestionDropdown
            data={item}
            myRoleType={role}
            myProfileType={clubInfo?.clubMemberData.profileType}
            isOpen={item.id == selectedFaq}
            setSelected={setSelectedFaq}
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

export default FaqSection;

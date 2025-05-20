import Alert from "@/components/alert/alert";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import EventCalendar from "@/components/calendar/eventCalender";
import ClubEventDropdown from "@/components/dropdown/clubEventDropdown";
import { useClubContext } from "@/context/ClubContext";
import {
  useDeleteClubEventMutation,
  useUpdateClubEventMutation,
} from "@/hooks/club/evnet/useClubEventMutation";
import { useClubEventQuery } from "@/hooks/club/evnet/useClubEventQuery";
import { ClubEventData, ClubEventSaveReq } from "@/types/clubEvent";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LeftMenu from "../../components/menu/leftMenu";

interface ListSectionProps {
  setEventModalOpen: (isOpen: boolean) => void;
}
const ListSection = ({ setEventModalOpen }: ListSectionProps) => {
  const params = useSearchParams();
  const clubId = params.get("clubId") ?? "";
  const { role } = useClubContext();

  // 일정 리스트
  const { data, hasNextPage, fetchNextPage } = useClubEventQuery(clubId);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleDropdownToggle = (id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  // 일정 삭제
  const { mutate: deleteEvent } = useDeleteClubEventMutation({
    clubId,
    onSuccess: () => setAlertMessage("일정이 삭제되었습니다."),
    onError: () => setAlertMessage("일정 삭제에 실패했습니다."),
  });

  // 일정 삭제 핸들러
  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
  };

  return (
    <div className="flex lg:gap-9 flex-col md:flex-row">
      <div>
        <EventCalendar eventList={data} />
        <div className="w-full">
          <LeftMenu />
        </div>
      </div>
      <div className="w-full">
        <section className="flex flex-col gap-3 md:gap-2.5">
          {data.map((event) => (
            <ClubEventDropdown
              key={event.id}
              clubId={clubId}
              event={event}
              isOpen={openDropdown == event.id}
              setOpenDropdownId={() => {
                handleDropdownToggle(event.id);
              }}
              role={role}
              onDelete={() => {
                handleDeleteEvent(event.id);
              }}
            />
          ))}
        </section>
        {data && hasNextPage && (
          <div className="flex justify-center mt-9 md:mt-10">
            <PlusBtn title={"더보기"} onClick={() => fetchNextPage()} />
          </div>
        )}
        {/* ====== 알림 ======*/}
        {alertMessage && (
          <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
        )}
      </div>
    </div>
  );
};

export default ListSection;

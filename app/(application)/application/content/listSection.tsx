import Alert from "@/components/alert/alert";
import ApplicationCard, {
  ApplicationCardProps,
} from "@/components/card/applicationCard";
import { ApplyData, ApplyTempData } from "@/types/application";
import { useState } from "react";

interface ListSectionProps {
  dataList?: (ApplyData | ApplyTempData)[];
}

const ListSection = ({ dataList = [] }: ListSectionProps) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleDeleteSuccess = () => {
    setAlertMessage("삭제되었습니다.");
  };
  const handleDeleteError = () => {
    setAlertMessage("삭제에 실패했습니다.");
  };

  const isApplyData = (data: ApplyData | ApplyTempData) => {
    return "applyStatusType" in data;
  };
  return (
    <div>
      {dataList.map((data) => (
        <div key={data.id}>
          <ApplicationCard
            data={data}
            applicationStatus={
              isApplyData(data) ? data.applyStatusType : "DRAFT"
            }
            type={isApplyData(data) ? "APPLY" : "TEMP_APPLY"}
            handleDeleteSuccess={handleDeleteSuccess}
            handleDeleteError={handleDeleteError}
          />
        </div>
      ))}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ListSection;

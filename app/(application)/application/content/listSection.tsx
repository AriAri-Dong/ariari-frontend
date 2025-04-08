import ApplicationCard, {
  ApplicationCardProps,
} from "@/components/card/applicationCard";
import { ApplyData, ApplyTempData } from "@/types/application";

interface ListSectionProps {
  dataList?: (ApplyData | ApplyTempData)[];
  handleDelete: (id: string, type: "APPLY" | "TEMP_APPLY") => void;
}

const ListSection = ({ dataList = [], handleDelete }: ListSectionProps) => {
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
            handleDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default ListSection;

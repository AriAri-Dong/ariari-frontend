import PointList from "@/components/list/pointList";
import { ListSectionProps } from "@/types/components/point";

const ListSection = ({
  dataList = [],
  isLast,
}: {
  dataList?: ListSectionProps[];
  isLast: boolean;
}) => {
  return (
    <div>
      {dataList.map((data, index) => (
        <div
          key={index}
          className={`${index === dataList.length - 1 ? "border-b-2" : ""}`}
        >
          <PointList
            date={data.date}
            title={data.title}
            point={data.point}
            isLast={index === dataList.length - 1 && isLast}
          />
        </div>
      ))}
    </div>
  );
};

export default ListSection;

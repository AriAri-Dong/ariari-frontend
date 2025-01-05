import ApplicationCard, {
  ApplicationCardProps,
} from "@/components/card/applicationCard";

const ListSection = ({
  dataList = [],
}: {
  dataList?: ApplicationCardProps[];
}) => {
  return (
    <div>
      {dataList.map((data, index) => (
        <div key={index}>
          <ApplicationCard
            clubId={data.clubId}
            clubName={data.clubName}
            applicationStatus={data.applicationStatus}
            clubStatus={data.clubStatus}
            date={data.date}
          />
        </div>
      ))}
    </div>
  );
};

export default ListSection;

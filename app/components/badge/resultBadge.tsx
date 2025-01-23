interface ResultBadgeProps {
  status: "합격" | "불합격" | "대기중" | "면접중";
}

const ResultBadge = ({ status }: ResultBadgeProps) => {
  const badgeColor = () => {
    switch (status) {
      case "합격":
        return "text-primary bg-selectedoption_hover";
      case "불합격":
        return "text-token_1 bg-token_1_bg";
      case "대기중":
        return "text-subtext2 bg-token_bg";
      case "면접중":
        return "text-token_3 bg-token_3_bg";
      default:
        return "";
    }
  };

  return (
    <div
      className={`flex justify-center items-center w-[56px] h-6 md:w-[60px] md:h-7 rounded-lg
         ${badgeColor()}`}
    >
      <p className="text-mobile_body3_m md:text-body3_m">{status}</p>
    </div>
  );
};

export default ResultBadge;

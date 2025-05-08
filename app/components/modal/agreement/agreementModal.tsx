import LargeBtn from "@/components/button/basicBtn/largeBtn";

const agreements = {
  privacy: { title: "개인정보 이용수칙", content: "...전문 내용..." },
  ariari: { title: "아리아리 이용수칙", content: "...전문 내용..." },
  operation: { title: "Ariari 동아리 운영원칙", content: "...전문 내용..." },
};

export default function AgreementModal() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <LargeBtn title={"다음"} onClick={() => {}} />
      </div>
    </div>
  );
}

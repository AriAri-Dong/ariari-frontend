import ClubInfoSection from "./clubInfoSection";

const ClubInfoWrapper = () => {
  return (
    <div className="bg-background flex justify-center items-center w-full">
      <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:px-5">
        <ClubInfoSection />
      </div>
    </div>
  );
};

export default ClubInfoWrapper;

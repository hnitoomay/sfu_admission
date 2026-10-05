import EducationBg from "./EducationBg";
import WorkHistory from "./WorkHistory";
import ProfileCard from "./ProfileCard";
import EnglishDoc from "./EnglishDoc";
import RecDoc from "./RecDoc";

function Profile() {

  return (
    <div className="bg-white-150">

      <div className="lg:flex justify-between p-5">
        {/* Left Column */}
        <ProfileCard />

        {/* Right Column */}
        <div className="lg:w-10/12 sm:w-full md:w-full my-5 p-5">
          <EducationBg />
          <br />
          <WorkHistory />
          <br />
          <EnglishDoc />
          <br />
          <RecDoc />
        </div>
      </div>
    </div>
  );
}

export default Profile;

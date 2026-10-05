import mbaLectureProfile from "../../data/mba/lectureProfile.json";
import mscLectureProfile from "../../data/msc/lectureProfile.json";
import { useSlugStore } from "../../store/useSlugStore";
import { localizedText } from "../../i18n";
import { useTranslation } from "../../i18n/useTranslation";

function LectureProfile() {
  const { isMBA, isMSC } = useSlugStore();
  const { language } = useTranslation();

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {(isMBA
          ? mbaLectureProfile
          : isMSC
          ? mscLectureProfile
          : []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        )?.map((profile: any) => (
          <div
            key={profile.id}
            className="flex flex-col items-center text-center p-10 mb-5 shadow-xl border border-white-150 rounded-xl"
          >
            <img
              src={profile.img}
              alt={localizedText(profile.name, language)}
              className="md:w-30 md:h-30 lg:w-52 lg:h-52 rounded-full object-fill mb-4"
            />
            <div className="text-lg font-bold mb-2 text-gray-800">
              {localizedText(profile.name, language)}
            </div>
            {profile.degree?.map((des: string, index: number) => (
              <p className="text-gray-600" key={index}>
                {localizedText(des, language)}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LectureProfile;

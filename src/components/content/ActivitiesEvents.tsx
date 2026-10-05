import { useSlugStore } from "../../store/useSlugStore";
import activitiesData from "../../data/activities.json";
import { localizedText, LocalizedText } from "../../i18n";
import { useTranslation } from "../../i18n/useTranslation";

export interface ActivityEvent {
  programme: "mba" | "msc" | "both";
  title: LocalizedText;
  image: string;
  bannerImage: string;
  date: string;
  description: LocalizedText[];
  galleryImages: string[];
}

export const activities = activitiesData as ActivityEvent[];

export const getActivities = (isMSC: boolean) =>
  activities.filter(
    (activity) =>
      activity.programme === "both" ||
      activity.programme === (isMSC ? "msc" : "mba")
  );

interface ActivitiesEventsProps {
  onViewActivity?: (activity: ActivityEvent) => void;
}

function ActivitiesEvents({ onViewActivity }: ActivitiesEventsProps) {
  const { isMSC } = useSlugStore();
  const { language, t } = useTranslation();
  const programmeActivities = getActivities(isMSC);

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-[32px] font-bold leading-tight text-[#262626] md:text-[40px]">
          {t("activitiesEvents.title")}
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#262626] md:text-base">
          {isMSC
            ? t("activitiesEvents.descriptionMSC")
            : t("activitiesEvents.descriptionMBA")}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {programmeActivities.map((activity) => (
          <article
            key={localizedText(activity.title, language)}
            role="button"
            tabIndex={0}
            onClick={() => onViewActivity?.(activity)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onViewActivity?.(activity);
              }
            }}
            className="flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl shadow-[0px_4px_10px_0px_#BCBCBC40]
              bg-white-100 shadow-sm"
          >
            <img
              src={activity.image}
              alt={localizedText(activity.title, language)}
              className="w-full object-cover"
            />
            <div className="flex min-h-[150px] flex-1 flex-col justify-between px-5 py-6
              border border-[#E6E6E6] rounded-b-2xl">
              <h2 className="text-sm font-semibold leading-7 text-[#262626] md:text-base">
                {localizedText(activity.title, language)}
              </h2>
              <span className="mt-6 self-end text-[14px] font-medium text-[#D30000] underline">
                {t("activitiesEvents.readMore")}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ActivitiesEvents;

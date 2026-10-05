import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useLocation } from "react-router-dom";
import usePath from "../hooks/customHook/usePath";
import { PATH_VALUES } from "../types/enum";
import { useSlugStore } from "../store/useSlugStore";
import { useTranslation } from "../i18n/useTranslation";

function HomeCard() {
  const location = useLocation();
  const { isMBA, isMSC, slug, homeCardData } = useSlugStore();
  const { t } = useTranslation();

  const checkOnlineOrBlended = usePath(location);
  const fees =
    checkOnlineOrBlended === PATH_VALUES.BLENDED
      ? t("homeCard.feesAnnounced")
      : t("homeCard.feesAnnounced");

  return (
    <>
      <div id="home-card" className="sm:hidden md:flex justify-center items-center">
        <div className="absolute -bottom-25 w-10/12 grid grid-cols-4 gap-0 rounded shadow-md">
          <div className="relative bg-white-50 rounded-l-lg shadow-md p-4">
            <p className="text-center sm:text-sm md:text-lg text-gray-500">
              <AccessAlarmIcon /> {t("homeCard.duration")}
            </p>
            <p className="text-center font-bold sm:text-sm md:text-md lg:text-lg text-gray-800 mt-2">
              {isMBA || isMSC || slug === undefined
                ? "1"
                : homeCardData?.data?.duration}{" "}
              {t("homeCard.year")}
            </p>
          </div>
          <div className="relative bg-white-50 shadow-md p-4">
            <p className="text-center sm:text-sm md:text-lg text-gray-500">
              <MonetizationOnOutlinedIcon /> {t("homeCard.fees")}
            </p>
            <p className="text-center font-bold sm:text-xs md:text-md lg:text-lg text-gray-800 mt-2">
              {isMBA || isMSC || slug === undefined
                ? fees
                : homeCardData?.data.fees}
            </p>
          </div>
          <div className="relative bg-white-50 shadow-md p-4">
            <p className="text-center sm:text-sm md:text-lg text-gray-500">
              <EventAvailableIcon /> {t("homeCard.intake")}
            </p>
            <p className="text-center font-bold sm:text-xs md:text-md lg:text-lg text-gray-800 mt-2">
              {isMBA || isMSC || slug === undefined
                ? t("homeCard.intakeDate")
                : homeCardData?.data.start_date}
            </p>
          </div>
          <div className="relative bg-white-50 rounded-r-lg shadow-md p-4">
            <p className="text-center sm:text-sm lg:text-md text-gray-500">
              <CalendarTodayIcon /> {t("homeCard.applicationDeadline")}
            </p>
            <p className="text-center font-bold sm:text-xs md:text-md lg:text-lg text-gray-800 mt-2">
              {isMBA || isMSC || slug === undefined
                ? t("homeCard.applicationDeadlineDate")
                : homeCardData?.data.application_deadline}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeCard;

import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useLocation } from "react-router-dom";
import usePath from "../hooks/customHook/usePath";
import { PATH_VALUES } from "../types/enum";
import { useSlugStore } from "../store/useSlugStore";
import { useTranslation } from "../i18n/useTranslation";

function HomeCardMobile() {
  const location = useLocation();
  const { isMBA, isMSC, slug, homeCardData } = useSlugStore();
  const { t } = useTranslation();

  const checkOnlineOrBlended = usePath(location);
  const fees =
    checkOnlineOrBlended === PATH_VALUES.BLENDED
      ? t("homeCard.feesAnnounced")
      : t("homeCard.feesAnnounced");

  return (
    <div className="md:hidden flex-1 space-y-4 items-center justify-center bg-white-50 rounded-lg mx-[10px] p-[10px] mb-[20px]">
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <AccessAlarmIcon sx={{ color: "#808080", fontWeight: 600 }} />
          <p className="text-gray-500 font-semibold">
            {t("homeCard.duration")}:
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-semibold">
            {isMBA || isMSC || slug === undefined
              ? "1"
              : homeCardData?.data?.duration}{" "}
            {t("homeCard.year")}
          </p>
        </div>
      </div>

      <div className="flex justify-between space-x-8">
        <div className="flex space-x-2 text-gray-500">
          <MonetizationOnOutlinedIcon
            sx={{ color: "#808080", fontWeight: 600 }}
          />
          <p className="text-gray-500 font-semibold">{t("homeCard.fees")}:</p>
        </div>
        <div>
          <p className="text-gray-500 font-semibold text-xs text-right">
            {isMBA || isMSC || slug === undefined
              ? fees
              : homeCardData?.data.fees}
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex space-x-2 text-gray-500">
          <EventAvailableIcon sx={{ color: "#808080", fontWeight: 600 }} />
          <p className="text-gray-500 font-semibold">
            {t("homeCard.intake")}:
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-semibold text-right">
            {isMBA || isMSC || slug === undefined
              ? t("homeCard.intakeDate")
              : homeCardData?.data.start_date}
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex space-x-2 text-gray-500">
          <CalendarTodayIcon sx={{ color: "#808080", fontWeight: 600 }} />
          <p className="text-gray-500 font-semibold">
            {t("homeCard.applicationDeadline")}:
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-semibold text-right">
            {isMBA || isMSC || slug === undefined
              ? t("homeCard.applicationDeadlineDate")
              : homeCardData?.data.application_deadline}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeCardMobile;

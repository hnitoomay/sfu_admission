import { useNavigate } from "react-router-dom";
import ProgramCard from "../components/ProgramCard";
import RootBgLayout from "../components/RootBgLayout";
import { useTranslation } from "../i18n/useTranslation";

function RootHomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <RootBgLayout>
        <div className="flex flex-col space-y-16 items-center justify-center">
          <h1 className="text-white-100 font-bold sm:text-lg md:text-3xl text-center">
            {t("home.title")}
          </h1>

          <p className="text-white-100 font-normal sm:text-[12px] md:text-[16px] text-center sm:p-0 md:px-24 lg:px-36">
            {t("home.description")}
          </p>
        </div>
      </RootBgLayout>

      <div className="sm:p-8 md:p-16">
        <h3 className="text-gray-800 font-bold text-lg uppercase mb-[24px]">
          {t("home.availablePrograms")}
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ProgramCard
            university={t("home.university")}
            subject={t("home.mbaSubject")}
            description={t("home.mbaDescription")}
            onClick={() =>
              navigate("/mba-sfu-wolverhampton", { replace: true })
            }
          />

          <ProgramCard
            university={t("home.university")}
            subject={t("home.mscSubject")}
            description={t("home.mscDescription")}
            onClick={() =>
              navigate("/msc-sfu-wolverhampton", { replace: true })
            }
          />
        </div>
      </div>
    </>
  );
}

export default RootHomePage;

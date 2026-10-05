import { useNavigate } from "react-router-dom";
import MainButton from "../Button";
import Header from "../Header";
import { useAuth } from "../../hooks/context/useAuth";
import { useSlugStore } from "../../store/useSlugStore";
import { useTranslation } from "../../i18n/useTranslation";

function HowToApply() {
  const { isMBA, isMSC } = useSlugStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const program = isMBA ? "mba" : isMSC ? "msc" : null;
  const onClickApplyNow = () => {
    if (user) {
      navigate("/personal", { state: program });
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <div>
        <Header title={t("howToApply.title")} />

        <div className="flex flex-col space-y-6 mt-8">
          <div className="flex items-center space-x-4">
            <div>
              <img src="/img/right-circle.png" alt="Right Circle" />
            </div>
            <p className="w-fit sm:text-sm md:text-[16px]">
              {t("howToApply.createAccount")}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <img src="/img/right-circle.png" alt="Right Circle" />
            </div>
            <p className="w-fit sm:text-sm md:text-[16px]">
              {t("howToApply.downloadBrochure")}
            </p>
          </div>

          <div className="flex items-center space-x-4 ">
            <div>
              <img
                src="/img/right-circle.png"
                alt="Right Circle"
                className="h-auto w-auto"
              />
            </div>
            <p className="w-fit sm:text-sm md:text-[16px]">
              {t("howToApply.submitBeforeDeadline")}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <img
                src="/img/right-circle.png"
                alt="Right Circle"
                className="h-auto w-auto"
              />
            </div>
            <p className="w-fit sm:text-sm md:text-[16px]">
              {t("howToApply.oneProgram")}
            </p>
          </div>
        </div>

        <div className="mt-6 max-w-full">
          <MainButton
            type="button"
            onClick={onClickApplyNow}
            className="inline-flex !w-fit max-w-full min-w-max items-center justify-center whitespace-nowrap bg-primary px-4 py-2.5 text-[clamp(11px,1.5vw,14px)] leading-[1.3] text-white-100"
          >
            {t("howToApply.applyNow")}
          </MainButton>
        </div>
      </div>

      <div className="mt-14">
        <Header title={t("howToApply.whatWeLookFor")} />

        <div>
          <p className="sm:text-sm md:text-[16px]">
            {t("howToApply.evaluationIntro")}
          </p>
          <ul className="list-disc list-outside text-gray-800 px-4 py-8 sm:text-sm md:text-[16px]">
            <li>{t("howToApply.academicAchievement")}</li>
            <li>{t("howToApply.leadership")}</li>
            <li>{t("howToApply.quantitative")}</li>
            <li>{t("howToApply.diverseExperiences")}</li>
          </ul>
          <p className="sm:text-sm md:text-[16px]">
            {t("howToApply.evaluationSummary")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HowToApply;

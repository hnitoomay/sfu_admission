import { Fragment } from "react/jsx-runtime";
import "../../css/custom.css";
import HomeCardMobile from "../HomeCardMobile";
import { createMarkup } from "../../lib/helper";
import mbaProgramOverviewData from "../../data/mba/programOverview.json";
import mscProgramOverviewData from "../../data/msc/programOverview.json";
import { useSlugStore } from "../../store/useSlugStore";
import { useTranslation } from "../../i18n/useTranslation";
import { localizedText } from "../../i18n";

function ProgramOverView() {
  const { isMBA, isMSC, data } = useSlugStore();
  const { language, t } = useTranslation();

  return (
    <>
      <HomeCardMobile />
      {(isMBA
        ? mbaProgramOverviewData
        : isMSC
        ? mscProgramOverviewData
        : data?.data
      )?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => (
          <Fragment key={item.id}>
             {/* <div className="mb-[30px]">
               <h3 className="text-gray-800 font-bold text-lg">
                {t("program.programoverview")}
              </h3>
            </div> */}
            <p
              className="text-gray-800 font-medium md:text-[14px] lg:text-base mb-[52px]"
              dangerouslySetInnerHTML={createMarkup(
                localizedText(item.description, language)
              )}
            ></p>

            <div className="mb-[52px]">
              <h3 className="text-gray-800 font-bold text-lg">
                {t("program.educationalAim")}
              </h3>
              {item.aim_of_the_program?.map(
                (program: string, index: number) => (
                  <p
                    key={index}
                    className="text-gray-800 font-normal md:text-[14px] lg:text-base mt-[24px]"
                  >
                    {localizedText(program, language)}
                  </p>
                )
              )}
            </div>

            <div className="mb-[52px]">
              <h3 className="text-gray-800 font-bold lg:text-lg">
                {t("program.knowledgeAcquisition")}
              </h3>
              <p className="text-gray-800 font-normal md:text-[14px] lg:text-base mt-[24px]">
                {t("program.knowledgeIntro")}
              </p>
              <div className="mt-[24px] ml-5">
                {item.knowledge?.map((knowledge: string, index: number) => (
                  <ul
                    key={index}
                    className="text-gray-800 md:text-[14px] lg:text-base list-disc list-outside"
                  >
                    <li>{localizedText(knowledge, language)}</li>
                  </ul>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-gray-800 font-bold text-lg">
                {t("program.skillDevelopment")}
              </h3>
              <p className="text-gray-800 font-normal md:text-[14px] lg:text-base mt-[24px]">
                {isMBA
                  ? t("program.skillIntroMBA")
                  : isMSC
                  ? t("program.skillIntroMSC")
                  : ""}
              </p>

              <div className="mt-[14px] ml-5">
                {item.skill_development?.map((skill: string, index: number) => (
                  <ul
                    key={index}
                    className="text-gray-800 md:text-[14px] lg:text-base list-disc list-outside"
                  >
                    <li>{localizedText(skill, language)}</li>
                  </ul>
                ))}
              </div>
            </div>
          </Fragment>
        )
      )}
    </>
  );
}

export default ProgramOverView;

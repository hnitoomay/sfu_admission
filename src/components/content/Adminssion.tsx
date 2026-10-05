import Header from "../Header";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { createMarkup } from "../../lib/helper";
import mbaAdmissionData from "../../data/mba/admission.json";
import mscAdmissionData from "../../data/msc/admission.json";
import { useSlugStore } from "../../store/useSlugStore";
import { localizedText } from "../../i18n";
import { useTranslation } from "../../i18n/useTranslation";

const processes = [
  { id: 1, key: "onlineApplication" },
  { id: 2, key: "reviewProcess" },
  { id: 3, key: "admissionCommittee" },
  { id: 4, key: "finalDecision" },
];
const lastElement = processes[processes.length - 1];

function Adminssion() {
  const { isMBA, isMSC, data } = useSlugStore();
  const { language, t } = useTranslation();
  const entryRequirementsDescriptionKey = isMSC
    ? "admission.entryRequirementsDescriptionMSC"
    : isMBA
    ? "admission.entryRequirementsDescriptionMBA"
    : "admission.entryRequirementsDescription";

  return (
    <>
      <div className="mb-[52px]">
        <Header title={t("admission.entryRequirements")} />
        <p className="text-gray-600">
          {t(entryRequirementsDescriptionKey)}
        </p>
        <div className="flex flex-col">
          {(isMBA
            ? mbaAdmissionData
            : isMSC
            ? mscAdmissionData
            : data?.data
          )?.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (item: any) => (
              <div key={item.id} className="flex min-w-0 space-x-4 mt-[24px]">
                <div className="shrink-0">
                  {/* {!isMBA || !isMSC || slug === undefined ? (
                    <img
                      src={`https://enroll-sfu.sgp1.digitaloceanspaces.com/sfu-edu/image/admission_req/${item.img}`}
                      alt={item.img}
                      className="w-16 h-16"
                    />
                  ) : (
                    <img src={`/img/${item.img}`} alt={item.image} />
                  )} */}
                  <img src={`/img/${item.img}`} alt={item.image} />
                </div>
                <div className="flex min-w-0 flex-col md:justify-center space-y-2 w-3/4">
                  <p
                    className="sm:text-sm md:text-[16px] lg:text-base text-gray-600 font-normal"
                    dangerouslySetInnerHTML={createMarkup(
                      localizedText(item.content, language)
                    )}
                  ></p>
                  {/* {item.id === 3 && (
                  <p className="font-bold text-sm text-gray-800">
                    * Remark -Only a professional recommendation is required if
                    the candidate is a Strategy First University alumni.
                  </p>
                )} */}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div>
        <h3 className="text-gray-800 font-bold text-lg mb-[24px]">
          {t("admission.applicationProcess")}
        </h3>

        <p className="text-gray-600 font-normal md:text-[14px] lg:text-base mb-[45px]">
          {t("admission.applicationProcessDescription")}
        </p>
        {/* {data?.map((item: any) => (
          <p
            className="text-gray-600 font-normal md:text-[14px] lg:text-base mb-[45px]"
            dangerouslySetInnerHTML={createMarkup(item.application_process)}
          ></p>
        ))} */}

        <div className="grid max-w-full grid-cols-2 justify-items-center gap-x-4 gap-y-6 md:grid-cols-4 md:gap-x-4 xl:gap-x-6">
          {processes.map((item) => {
            return (
              <div className="flex min-w-0 flex-col items-center space-y-4 text-center" key={item.id}>
                <div className="flex min-w-0 items-center justify-center gap-2">
                  <div className="sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex shrink-0 flex-col items-center justify-center border border-primary rounded-full bg-primary/5">
                    <p className="text-gray-800 font-bold sm:text-xs md:text-lg">
                      0{item.id}
                    </p>
                    <p className="text-gray-800 font-normal sm:text-[10px] md:text-[14px] lg:text-base">
                      {t("admission.step")}
                    </p>
                  </div>

                  {lastElement.id != item.id && (
                    <div className="hidden min-w-0 flex-1 items-center justify-center md:flex">
                      <div className="h-1 min-w-0 flex-1 border-t-2 border-dashed border-gray-400 my-2 sm:my-4"></div>
                      <ArrowRightOutlinedIcon
                        className="shrink-0"
                        sx={{ color: "#000000" }}
                      />
                    </div>
                  )}
                </div>
                <p className="min-w-0 text-center text-gray-800 sm:text-xs md:text-lg">
                  {t(`admission.${item.key}`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Adminssion;

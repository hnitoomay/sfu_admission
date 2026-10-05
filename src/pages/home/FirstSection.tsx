import HomeBgLayout from "../../components/HomeBgLayout";
import MainButton from "../../components/Button";
import DownloadBroForMobile from "../../components/DownloadBroForMobile";
import DownloadBrochureForm from "../../components/DownloadBrochureForm";
import { useState } from "react";
import { useSlugStore } from "../../store/useSlugStore";
import { useTranslation } from "../../i18n/useTranslation";

function FirstSection() {
  // const navigate = useNavigate();
  const { isMBA, isMSC, slug, homeCardData } = useSlugStore();
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  // const checkOnlineOrBlended = usePath(location);

  // const status =
  //   checkOnlineOrBlended === PATH_VALUES.BLENDED ? "Blended" : "Online";

  const clickShowModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  return (
    <HomeBgLayout>
      <div className="grid w-full min-w-0 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2 xl:gap-40 md:gap-4">
        <div className="flex min-w-0 flex-col items-center justify-center sm:space-y-6 xl:space-y-8 md:mt-5 xl:items-start">
          <h1 className="mx-auto max-w-[min(100%,34rem)] text-center text-white-100 font-bold sm:text-xl md:text-4xl xl:mx-0 xl:max-w-none xl:text-left leading-loose">
            {isMBA || slug === undefined
              ? t("program.mbaTitle")
              : isMSC
              ? t("program.mscTitle")
              : homeCardData?.data?.title}
          </h1>

          {/* <div className="bg-border-100 border rounded-lg w-fit">
            <p className="px-[15px] py-[5px] text-blue-100 text-[15px] font-md">
              {isMBA || isMSC || slug === undefined
                ? status
                : homeCardData?.data?.type?.charAt(0).toUpperCase() +
                  homeCardData?.data?.type?.slice(1)}
            </p>
          </div> */}

          {/* <MainButton type="button" onClick={() => navigate("/personal")}>
            APPLY NOW
          </MainButton> */}

          <MainButton
            onClick={clickShowModal}
            className="mx-auto inline-flex !w-fit items-center justify-center md:hidden"
          >
            <div className="flex items-center justify-center space-x-2">
              <img src="/img/download-1.png" />
              <p className="text-white-100 text-sm">
                {t("program.requestInformation")}
              </p>
            </div>
          </MainButton>
        </div>
        <div className="sm:hidden md:block mb-8">
          <DownloadBrochureForm />
        </div>
      </div>
      {showModal && <DownloadBroForMobile />}
    </HomeBgLayout>
  );
}

export default FirstSection;

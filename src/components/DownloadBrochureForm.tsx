import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  DownloadBrochureVType,
  downloadBrochureSchema,
} from "../lib/validation/DownloadBrochure";
import { useState } from "react";
import Input from "./form/Input";
import { downloadBrochure } from "../services/downloadBrochure";
import { classNames, downloadPdfFile } from "../lib/helper";
import Button from "./form/Button";
import ModalDialog from "./ModalDialog";
import LoadingSpinner from "./Loading";
import { useSlugStore } from "../store/useSlugStore";
import { useTranslation } from "../i18n/useTranslation";

interface DownloadBrochureFormParams {
  closeModal?: () => void;
}

function DownloadBrochureForm(props: DownloadBrochureFormParams) {
  const { closeModal } = props;
  const { isMBA } = useSlugStore();
  const { t } = useTranslation();
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(downloadBrochureSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = methods;

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dialog, setDialog] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const onSubmit: SubmitHandler<DownloadBrochureVType> = async (data) => {
    setLoading(true);

    const response = await downloadBrochure(data);
    if (response?.message == "Successfully") {
      const pdfUrl = isMBA ? "/pdf/MBA-July2026.pdf" : "/pdf/MSc-July2026.pdf";
      downloadPdfFile(pdfUrl, `${isMBA ? "mba" : "msc"}.pdf`);
      setShowSuccess(true);
    } else {
      setDialog({
        title: t("common.error"),
        description: t("common.somethingWentWrong"),
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center">
      {loading && <LoadingSpinner />}
      <div className="md:w-3/4 rounded-xl sm:bg-white-100 md:bg-white-50 md:p-10 md:border md:border-gray-500/10 md:shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="flex items-center justify-between w-full">
          <img
            src="/img/logo-update.png"
            alt="Logo"
            className="block md:w-64 sm:w-60"
          />
          <div
            className="sm:block md:hidden w-8 cursor-pointer"
            onClick={closeModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className=" text-gray-800 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div
          className={classNames(showSuccess ? "p-20" : "pt-8", "flex flex-col")}
        >
          {!showSuccess && (
            <p className="text-gray-600 text-xs font-semibold mb-5">
              {t("brochure.intro")}
            </p>
          )}
          {!showSuccess ? (
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  id="name"
                  label={t("brochure.name")}
                  placeholder={t("brochure.namePlaceholder")}
                  requiredField
                />
                <input
                  type="hidden"
                  {...register("program")}
                  value={isMBA ? "mba" : "msc"}
                />

                <Input
                  id="email"
                  label={t("brochure.email")}
                  type="email"
                  placeholder={t("brochure.emailPlaceholder")}
                  requiredField
                />

                <Input
                  id="phone"
                  label={t("brochure.phone")}
                  placeholder="Enter your phone number"
                  type="number"
                  requiredField
                />

                <Button
                  quaternary={true}
                  isDisabled={!isValid}
                  type="submit"
                  className="w-full px-1 "
                >
                  <div className="flex items-center justify-center md:space-x-4 xl:space-x-1 2xl:space-x-4">
                    <img src="/img/download-1.png" />
                    <p className="text-white-100">
                      {t("brochure.requestDownload")}
                    </p>
                  </div>
                </Button>
              </form>
            </FormProvider>
          ) : (
            <div className="flex flex-col space-y-4 items-center justify-center">
              <img src="/img/success-right.png" alt="Success" />
              <p className="text-gray-800 font-bold text-lg">
                {t("brochure.thankYou")}
              </p>

              <p className="text-center text-gray-600 text-xs font-semibold">
                {t("brochure.success")}
              </p>
            </div>
          )}
        </div>
      </div>

      {dialog && (
        <ModalDialog
          title={dialog.title}
          bodyText={dialog.description}
          btnRight={{
            title: t("common.ok"),
            onClick: () => {
              setDialog(null);
            },
          }}
          onClose={() => {}}
        />
      )}
    </div>
  );
}

export default DownloadBrochureForm;

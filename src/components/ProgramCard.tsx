import { useTranslation } from "../i18n/useTranslation";

interface ProgramParams {
  university: string;
  subject: string;
  description: string;
  onClick: () => void;
}

function ProgramCard(props: ProgramParams) {
  const { university, subject, description, onClick } = props;
  const { t } = useTranslation();

  return (
    <div className="bg-blue-150 px-[24px] py-[40px] border-t-8 border-primary rounded-xl shadow-xl shadow-gray-850/20">
      <div className="flex flex-col sm:space-y-4 md:space-y-8">
        <div className="flex space-x-2">
          <img src="/img/uni2.png" alt="Hero Watt" />
          <p className="text-gray-600 sm:text-sm md:text-base uppercase">
            {university}
          </p>
        </div>
        <p className="text-gray-800 font-semibold sm:text-base md:text-xl">
          {subject}
        </p>
        <p className="text-gray-800 font-normal sm:text-sm md:text-base text-justify">
          {description}
        </p>
      </div>

      <div
        className="float-right sm:mt-[30px] md:mt-[95px] px-[16px] sm:py-[10px] md:py-[14px] border-2 border-gray-800 rounded-lg cursor-pointer"
        onClick={onClick}
      >
        <div className="flex space-x-4 items-center">
          <p className="text-gray-600 font-medium text-sm">
            {t("common.learnMore")}
          </p>
          <img
            src="/img/right_arrow(1).png"
            alt="Right Arrow"
            className="w-2 h-[15px]"
          />
        </div>
      </div>
    </div>
  );
}

export default ProgramCard;

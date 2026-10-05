import { useContext } from "react";
import { ProgressContext } from "../hooks/context/ProgressContext";
import { classNames } from "../lib/helper";
import { useTranslation } from "../i18n/useTranslation";

const Right = () => {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.9322 2.61816L6.82898 12.7214C6.74098 12.8097 6.63642 12.8798 6.52129 12.9276C6.40615 12.9754 6.28272 13 6.15806 13C6.03339 13 5.90996 12.9754 5.79483 12.9276C5.6797 12.8798 5.57513 12.8097 5.48714 12.7214L1.06697 8.30124C0.97886 8.21314 0.90897 8.10854 0.861287 7.99342C0.813604 7.8783 0.789063 7.75492 0.789063 7.63032C0.789062 7.50572 0.813604 7.38234 0.861287 7.26722C0.90897 7.15211 0.97886 7.04751 1.06697 6.9594C1.15507 6.8713 1.25967 6.80141 1.37479 6.75372C1.4899 6.70604 1.61328 6.6815 1.73789 6.6815C1.86249 6.6815 1.98587 6.70604 2.10098 6.75372C2.2161 6.80141 2.3207 6.8713 2.4088 6.9594L6.15885 10.7094L15.592 1.2779C15.7699 1.09996 16.0112 1 16.2629 1C16.5145 1 16.7559 1.09996 16.9338 1.2779C17.1117 1.45584 17.2117 1.69718 17.2117 1.94882C17.2117 2.20047 17.1117 2.4418 16.9338 2.61974L16.9322 2.61816Z"
        fill="white"
        stroke="white"
      />
    </svg>
  );
};

const data = [
  { id: 1, titleKey: "applicationForm.personalInfo", number: "1" },
  { id: 2, titleKey: "applicationForm.requiredDocuments", number: "2" },
  { id: 3, titleKey: "applicationForm.successful", number: "3" },
];

interface ProgressBarParams {
  id: number;
  titleKey: string;
  number: string;
}

const lastElement = data[data.length - 1];

function ProgressBar() {
  const { id, currentId } = useContext(ProgressContext);
  const { t } = useTranslation();

  return (
    <div className="flex sm:py-8 md:py-2 items-center justify-center">
      {data.map((item: ProgressBarParams) => (
        <div key={item.id}>
          <div
            className={classNames(
              item.id != lastElement.id ? "mr-2" : "",
              "flex items-cemter justify-center space-x-2"
            )}
          >
            <div className="flex flex-col space-y-2 items-center w-10">
              <div
                className={classNames(
                  item.id == id || item.id < id || item.id == currentId + 1
                    ? "bg-primary"
                    : "bg-white-50",
                  "flex items-center justify-center rounded-full w-10 h-10 border-2 border-gray-200"
                )}
              >
                {item.id == id || item.id < id ? (
                  <Right />
                ) : (
                  <p
                    className={classNames(
                      item.id == id || item.id == currentId + 1
                        ? "text-white-50"
                        : "text-gray-400",
                      "font-bold"
                    )}
                  >
                    {item.number}
                  </p>
                )}
              </div>

              <p className="text-gray-800 font-medium sm:text-[10px] lg:text-base text-nowrap text-center">
                {t(item.titleKey)}
              </p>
            </div>

            {item.id != lastElement.id && (
              <div
                className={classNames(
                  item.id == id || item.id < id
                    ? "border-primary"
                    : "border-gray-400",
                  "flex items-center justify-center sm:w-12 md:w-20 lg:w-32 xl:w-40 h-1 border-t-2 border-dashed my-4"
                )}
              ></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProgressBar;

import { Fragment, useState } from "react";
import faqData from "../../data/faq.json";
import { useSlugStore } from "../../store/useSlugStore";
import { localizedText } from "../../i18n";
import { useTranslation } from "../../i18n/useTranslation";

function Faq() {
  const { data } = useSlugStore();
  const { language } = useTranslation();

  const [activeId, setActiveId] = useState<number | null>();

  const clickArrow = (id: number) => {
    if (activeId === id) {
      setActiveId(null); // Hide details if the same id is clicked again
    } else {
      setActiveId(id); // Show details for the clicked id
    }
  };

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {(data !== undefined ? data?.data : faqData)?.map((item: any) => (
        <Fragment key={item.id}>
          <div className="flex justify-between items-start">
            <div className="pt-[33px] w-full">
              <p className="text-gray-700 font-semibold sm:text-md md:text-base lg:text-base mb-[33px]">
                {localizedText(item.question, language)}
              </p>
              {activeId === item.id && (
                <div>
                  {item.answer?.map((ans: string, index: number) =>
                    item.answer?.length > 1 ? (
                      <ul
                        key={index}
                        className="list-inside list-disc text-gray-600 font-normal md:text-[14px] lg:text-base mt-[25px] mb-[32px]"
                      >
                        <li>{localizedText(ans, language)}</li>
                      </ul>
                    ) : (
                      <p
                        key={index}
                        className="text-gray-600 font-normal md:text-[14px] lg:text-base mt-[25px] mb-[32px]"
                      >
                        {localizedText(ans, language)}
                      </p>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="mt-10">
              <img
                src={
                  activeId === item.id
                    ? "/img/uparrow.png"
                    : "/img/downarrow.png"
                }
                onClick={() => clickArrow(item.id)}
                className="w-6 h-6"
              />
            </div>
          </div>
          <hr />
        </Fragment>
      ))}
    </>
  );
}

export default Faq;

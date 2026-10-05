import { Fragment, useState } from "react";
import Header from "../Header";
import { useGetSpecialisation } from "../../services/information/information";
import LoadingSpinner from "../Loading";
import { useParams } from "react-router-dom";
import specialisationData from "../../data/specialisation.json";
import { localizedText } from "../../i18n";
import { useTranslation } from "../../i18n/useTranslation";

function Specialisation() {
  const { slug } = useParams();
  const { data, error, isLoading } = useGetSpecialisation(slug as string);
  const { language } = useTranslation();

  const [activeModuleId, setActiveModuleId] = useState<number | null>();

  const clickArrow = (id: number) => {
    if (activeModuleId === id) {
      setActiveModuleId(null); // Hide details if the same id is clicked again
    } else {
      setActiveModuleId(id); // Show details for the clicked id
    }
  };

  if (error || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Header title="SPECIALIZATION MODULES" />

      <div className="flex flex-col bg-white-50 rounded-lg">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {(data !== undefined ? data : specialisationData)?.map((item: any) => (
          <Fragment key={item.id}>
            <div className="flex justify-between items-start p-6">
              <div className="flex space-x-4">
                <div className="flex items-center justify-center sm:w-8 sm:h-8 sm:text-md md:text-base lg:text-base bg-gray-50 text-gray-700 font-semibold rounded-full">
                  {item.id}
                </div>
                <div className="flex items-center sm:w-3/4 lg:w-fit">
                  <p className="text-gray-700 font-semibold sm:text-[14px] md:text-base lg:text-base inline">
                    {localizedText(item.title, language)}
                  </p>
                </div>
              </div>

              <div>
                <img
                  src={
                    activeModuleId === item.id
                      ? "/img/uparrow.png"
                      : "/img/downarrow.png"
                  }
                  onClick={() => clickArrow(item.id)}
                  className="md:w-6 md:h-6"
                />
              </div>
            </div>
            {activeModuleId == item.id && (
              <div className="bg-blue-150 p-2">
                {item.content?.map((moduleData: string, index: number) => (
                  <div key={index}>
                    <p className="text-gray-600 font-normal md:text-[13px] lg:text-base p-4">
                      {localizedText(moduleData, language)}
                    </p>
                    {index !== item.content.length - 1 && (
                      <hr className="w-full"></hr>
                    )}
                  </div>
                ))}
              </div>
            )}
            {data !== undefined ? (
              <>
                {item.id !== data[data.length - 1].id && (
                  <hr className="w-full" />
                )}
              </>
            ) : (
              <>
                {item.id !==
                  specialisationData[specialisationData.length - 1].id && (
                  <hr className="w-full" />
                )}
              </>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default Specialisation;

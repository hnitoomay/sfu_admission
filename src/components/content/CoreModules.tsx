import Header from "../Header";
import { Table, TableHead, TableHeader, TableRow } from "../Table";
import { useState } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import mbaModules from "../../data/mba/coreModuleUpdate.json";
import mscModules from "../../data/msc/coreModule.json";
import { useSlugStore } from "../../store/useSlugStore";
import { localizedText } from "../../i18n";
import { useTranslation } from "../../i18n/useTranslation";

function CoreModules() {
  const { isMBA, isMSC, data } = useSlugStore();
  const { language, t } = useTranslation();

  const [activeModuleId, setActiveModuleId] = useState<number | null>();

  const lastElement = isMBA
    ? mbaModules[mbaModules.length - 1]
    : isMSC
    ? mscModules[mscModules.length - 1]
    : null;

  const clickArrow = (id: number) => {
    if (activeModuleId === id) {
      setActiveModuleId(null);
    } else {
      setActiveModuleId(id); // Show details for the clicked id
    }
  };

  return (
    <>
      <Header title="Modules" />
      <div className="flex flex-col bg-white-100 rounded-lg sm:border sm:border-gray-50">
        {(isMBA ? mbaModules : isMSC ? mscModules : data?.data)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ?.map((item: any) => (
            <div
              key={item.id}
            >
              <div
                className="flex justify-between items-start p-6 rounded-lg cursor-pointer"
                onClick={() => clickArrow(item.id)}
              >
                <div className="flex space-x-4">
                  <div className="flex items-center justify-center sm:w-8 sm:h-8 sm:text-md md:text-base lg:text-base bg-white-50 text-gray-700 font-semibold rounded-full shadow-lg shadow-gray-850/20">
                    {item.id}
                  </div>
                  <div className="flex items-center sm:w-3/4 lg:w-fit">
                    <p className="text-gray-700 font-semibold sm:text-[14px] md:text-base lg:text-base inline">
                      {localizedText(item.subject, language)}
                    </p>
                  </div>
                </div>

                <div>
                  <img
                    alt={activeModuleId === item.id ? "Collapse" : "Expand"}
                    src={
                      activeModuleId === item.id
                        ? "/img/uparrow.png"
                        : "/img/downarrow.png"
                    }
                    className="md:w-6 md:h-6"
                  />
                </div>
              </div>

              {activeModuleId == item.id && (
                <div className="bg-blue-150 p-8">
                  <>
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                      <Table>
                        <TableHead>
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-center text-gray-700 text-sm bg-border-100"
                            >
                              {t("coreModules.moduleTitle")}
                            </th>

                            <th
                              scope="col"
                              className="px-6 py-3 text-center text-gray-700 text-sm"
                            >
                              {t("coreModules.credits")}
                            </th>

                            <th
                              scope="col"
                              className="px-6 py-3 text-center text-gray-700 text-sm"
                            >
                              {t("coreModules.period")}
                            </th>
                          </tr>
                        </TableHead>
                        <tbody>
                          <TableRow>
                            <td
                              className="text-gray-700 p-5 first-col-sticky bg-white-100"
                              scope="col"
                            >
                              {localizedText(item.title, language)}
                            </td>
                            <td
                              scope="col"
                              className="px-6 py-3 text-center text-blue-100"
                            >
                              <b>{localizedText(item.credit, language)}</b>
                            </td>
                            <td
                              scope="col"
                              className="px-6 py-3 text-center text-blue-100"
                            >
                              <b>{localizedText(item.learning_hour, language)}</b>
                            </td>
                          </TableRow>
                        </tbody>
                      </Table>
                    </div>
                    <br />

                    {item.module_overview && (
                      <>
                        <div className="overflow-x-auto shadow-md sm:rounded-lg">
                          <Table>
                            <TableHead>
                              <tr className="text-gray-700">
                                <TableHeader>
                                  <DragIndicatorIcon className="text-gray-400 mr-4" />{" "}
                                  {t("coreModules.moduleOverview")}
                                </TableHeader>
                              </tr>
                            </TableHead>
                            <tbody>
                              <TableRow>
                                <td className="text-sm text-gray-700 p-5">
                                  {localizedText(item.module_overview, language)
                                    .split("\n\n")
                                    .map((paragraph: string, index: number) => (
                                      <p
                                        key={index}
                                        className={`text-sm text-gray-700${
                                          index > 0 ? " mt-4" : ""
                                        }`}
                                      >
                                        {paragraph}
                                      </p>
                                    ))}
                                </td>
                              </TableRow>
                            </tbody>
                          </Table>
                        </div>
                        <br />
                      </>
                    )}

                    {item.learning_outcome && item.learning_outcome.length > 0 && (
                      <>
                        <div className="overflow-x-auto shadow-md sm:rounded-lg">
                          <Table>
                            <TableHead>
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-gray-700 text-sm"
                                >
                                  <DragIndicatorIcon className="text-gray-400 mr-4" />{" "}
                                  {t("coreModules.learningOutcomes")}
                                </th>
                              </tr>
                            </TableHead>
                            <tbody>
                              <TableRow>
                                <td className="text-gray-700 p-5">
                                  {t("coreModules.studentWillBeAble")} <br />
                                  {item.learning_outcome.map(
                                    (learning: string, index: number) => (
                                      <ul
                                        key={index}
                                        className="list-disc list-inside"
                                      >
                                        <li>
                                          {localizedText(learning, language)}
                                        </li>
                                      </ul>
                                    )
                                  )}
                                </td>
                              </TableRow>
                            </tbody>
                          </Table>
                        </div>
                        <br />
                      </>
                    )}

                    {item.assessments && item.assessments.length > 0 && (
                      <>
                        <div className="overflow-x-auto shadow-md sm:rounded-lg">
                          <Table>
                            <TableHead>
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-gray-700 text-sm"
                                >
                                  <DragIndicatorIcon className="text-gray-400 mr-4" />{" "}
                                  {t("coreModules.assessments")}
                                </th>
                              </tr>
                            </TableHead>
                            <tbody>
                              <TableRow>
                                <td className="text-gray-700 p-5">
                                  {item.assessments.map(
                                    (ass: string, index: number) => (
                                      <ul
                                        key={index}
                                        className="list-disc list-inside"
                                      >
                                        <li>{localizedText(ass, language)}</li>
                                      </ul>
                                    )
                                  )}
                                </td>
                              </TableRow>
                            </tbody>
                          </Table>
                        </div>
                        <br />
                      </>
                    )}
                  </>

                  {/* <div className="overflow-x-auto shadow-md sm:rounded-lg">
                  <Table>
                    <TableHead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-gray-700 text-sm bg-border-100"
                        >
                          Week
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-gray-700 text-sm"
                        >
                          Session Topic
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-gray-700 text-sm"
                        >
                          Learning Objectives
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-gray-700 text-sm"
                        >
                          Core Text Reading
                        </th>
                      </tr>
                    </TableHead>
                    <tbody>
                      {item.course_details?.map((course: any) => (
                        <TableRow className="bg-white-100" key={course.id}>
                          <td className="text-gray-700 p-5 text-center first-col-sticky bg-white-100">
                            {course.week}
                          </td>
                          <td className="text-gray-700 p-5 text-center">
                            {course.session_topic}
                          </td>
                          <td className="text-gray-700 p-5">
                            {course.learning_obj?.map(
                              (obj: string, index: number) => (
                                <ul
                                  key={index}
                                  className="list-inside list-disc"
                                >
                                  <li>{obj}</li>
                                </ul>
                              )
                            )}
                          </td>
                          <td className="text-gray-700 p-5">
                            {course.core_txt_reading}
                          </td>
                        </TableRow>
                      ))}
                    </tbody>
                  </Table>
                </div>

                <br /> */}
                  {/* <div className="overflow-x-auto shadow-md sm:rounded-lg">
                  <Table>
                    <TableHead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-gray-700 text-sm"
                        >
                          <DragIndicatorIcon className="text-gray-400 mr-4" />{" "}
                          Reference Textbooks
                        </th>
                      </tr>
                    </TableHead>
                    <tbody>
                      {item.ref_txt_book?.map((book: string, index: number) => (
                        <TableRow
                          key={index}
                          className="bg-white-100 border-none"
                        >
                          <td className="text-gray-700 p-5">
                            <p className="border-l-2 border-blue-100 pl-2 bg-blue-150 p-3">
                              {book}
                            </p>{" "}
                          </td>
                        </TableRow>
                      ))}
                    </tbody>
                  </Table>
                </div> */}
                </div>
              )}
              {item.id != lastElement?.id && <hr className="w-full"></hr>}
            </div>
          ))}
      </div>
    </>
  );
}

export default CoreModules;

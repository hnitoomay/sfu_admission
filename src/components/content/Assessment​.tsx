import { Fragment } from "react/jsx-runtime";
import { classNames, createMarkup } from "../../lib/helper";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "../Table";
import { useSlugStore } from "../../store/useSlugStore";

const assessementLocalHeader = [
  { id: 1, title: "Module Name" },
  { id: 2, title: "Assessment Type" },
  { id: 3, title: "Words" },
  // { id: 4, title: "Learning Outcome" },
];

const assessmentLocalDataForMba = [
  {
    id: 1,
    moduleName: "Strategic Marketing and Digital Communication",
    type: "Coursework",
    words: "4000",
    learningOutcome: "LO 1, LO 2, LO 3, LO 4",
  },
  {
    id: 2,
    moduleName: "Leadership and Digital Transformation Strategy",
    type: "Portfolio",
    words: "4000",
    learningOutcome: "LO 1, LO 2, LO 3, LO 4",
  },
  {
    id: 3,
    moduleName: "Leadership for Change",
    type: "Presentation",
    words: "4000",
    learningOutcome: "LO 1, LO 2, LO 3, LO 4",
  },
  {
    id: 4,
    moduleName: "Strategic Financial Management and Accounting",
    type: "Coursework",
    words: "4500",
    learningOutcome: "LO 1, LO 2, LO 3, LO 4",
  },
  {
    id: 5,
    moduleName: "The Masters Research Project",
    type: "Research",
    words: "15000",
    learningOutcome: "LO 1, LO 2, LO 3, LO 4",
  },
];

const assessmentLocalDataForMsc = [
  {
    id: 1,
    moduleName: "Research Methods & Professionalism",
    type: "TBC",
    words: "TBC",
    learningOutcome: "LO 1, LO 2, LO 3, LO 4",
  },
  {
    id: 2,
    moduleName: "Advanced Artificial Intelligence and Machine Learning",
    type: "TBC",
    words: "TBC",
    learningOutcome: "LO 1, LO 2",
  },
  {
    id: 3,
    moduleName: "XR Application Development",
    type: "TBC",
    words: "TBC",
    learningOutcome: "LO 1, LO 2, LO 3",
  },
  {
    id: 4,
    moduleName: "Cloud Infrastructure and Platforms",
    type: "TBC",
    words: "TBC",
    learningOutcome: "LO 1, LO 2, LO 3",
  },
  {
    id: 5,
    moduleName: "Web Technologies",
    type: "TBC",
    words: "TBC",
    learningOutcome: "LO 1, LO 2, LO 3",
  },
  {
    id: 6,
    moduleName: "Data Mining and Analytics",
    type: "TBC",
    words: "TBC",
    learningOutcome: "LO 1, LO 2",
  },
  {
    id: 7,
    moduleName: "Applied Database Systems",
    type: "TBC",
    words: "TBC",
    learningOutcome: "LO 1, LO 2",
  },
  {
    id: 8,
    moduleName: "Advanced Software Engineering",
    type: "TBC",
    words: "TBC",
    learningOutcome: "LO 1, LO 2",
  },
];

function Assessment() {
  const { isMBA, isMSC, data } = useSlugStore();

  return (
    <>
      {isMBA || isMSC ? (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <Table>
            <TableHead>
              <tr>
                {assessementLocalHeader.map((header) => (
                  <TableHeader key={header.id}>{header.title}</TableHeader>
                ))}
              </tr>
            </TableHead>
            <tbody>
              {(isMBA
                ? assessmentLocalDataForMba
                : isMSC
                ? assessmentLocalDataForMsc
                : []
              ).map((item) => (
                <TableRow key={item.id}>
                  <TableCell
                    sticky
                    className={classNames(
                      item.id % 2 == 0 ? "bg-border-100" : "bg-white-100",
                      "whitespace-normal"
                    )}
                  >
                    {item.moduleName}
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.words}</TableCell>
                </TableRow>
              ))}
              {isMSC && (
              <TableRow className="bg-white-100">
                <TableCell>ITM and Computer Science Dissertation</TableCell>
                <TableCell colSpan={2} className="text-center">
                  Dissertation Report(80%) <br></br> Viva Voce(20%)
                </TableCell>
              </TableRow>
              )}
            </tbody>
          </Table>
        </div>
      ) : (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?.data?.map((item: any) => (
          <Fragment key={item.id}>
            <div className="mb-[52px]">
              <h3 className="text-gray-800 font-bold text-lg">
                ASSESSMENT STRATEGIES
              </h3>
              <p
                className="text-gray-600 font-normal md:text-[14px] lg:text-base mt-[24px]"
                dangerouslySetInnerHTML={createMarkup(item.strategy)}
              ></p>
            </div>

            <div className="mb-[52px]">
              <h3 className="text-gray-800 font-bold text-lg">
                ASSESSMENT LANGUAGE
              </h3>
              <p
                className="text-gray-600 font-normal md:text-[14px] lg:text-base mt-[24px]"
                dangerouslySetInnerHTML={createMarkup(item.language)}
              ></p>
            </div>

            <div className="mb-[52px]">
              <h3 className="text-gray-800 font-bold text-lg">APPROACH</h3>
              <p
                className="text-gray-600 font-normal md:text-[14px] lg:text-base mt-[24px]"
                dangerouslySetInnerHTML={createMarkup(item.approach)}
              ></p>
            </div>
          </Fragment>
        ))
      )}
    </>
  );
}

export default Assessment;

import { useRef } from "react";
import { downloadPdfFile } from "../../lib/helper";
import Header from "../Header";
import DownloadPdf from "../DownloadPdf";
import { useSlugStore } from "../../store/useSlugStore";

// const academicHeader = [
//   { id: 1, title: "Quarter" },
//   { id: 2, title: "Year" },
//   { id: 3, title: "Months" },
//   { id: 4, title: "Duratoins" },
//   { id: 5, title: "Modules" },
//   { id: 6, title: "Module Names" },
//   { id: 7, title: "Lecture" },
// ];

// const academicData = [
//   {
//     id: 1,
//     quarter: "Q1",
//     year_online: "2024",
//     year_blended: "2024",
//     month_online: "June-Aug",
//     month_blended: "Sept-Nov",
//     duration: "3 months",
//     module: "2 modules",
//     moduleName: [
//       "General Management  and Leadership",
//       "Accounting and Financial Reporting",
//     ],
//     lecture: [
//       {
//         name: "Daw Aye Aye Win",
//         image: "/img/teacher/daw-aye-aye-win.jpg",
//       },
//       {
//         name: "Daw Khin Nwe Own",
//         image: "img/teacher/daw-khin-nwe-ohn.jpg",
//       },
//     ],
//   },

//   {
//     id: 2,
//     quarter: "Q2",
//     year_online: "2024",
//     year_blended: "2024-2025",
//     month_online: "Sept-Nov",
//     month_blended: "Dec-Feb",
//     duration: "3 months",
//     module: "2 modules",
//     moduleName: [
//       "Managerial  Economic ",
//       "Business Statistics and Data Analytics",
//     ],
//     lecture: [
//       {
//         name: "Dr.Myint San",
//       },
//       {
//         name: "Prof. Dr Swe Swe Zin",
//       },
//     ],
//   },

//   {
//     id: 3,
//     quarter: "Q3",
//     year_online: "2024-2025",
//     year_blended: "2025",
//     month_online: "Dec-Feb",
//     month_blended: "March-May",
//     duration: "3 months",
//     module: "2 modules",
//     moduleName: [
//       "Production and Operations Management",
//       "Strategic People Management",
//     ],
//     lecture: [
//       {
//         name: "U Win Thu Aung",
//         image: "/img/teacher/u-win-thu-aung.jpg",
//       },
//       {
//         name: "Prof.Dr Daw Ohnamr Myint ",
//         image: "img/teacher/prof-dr-daw-ohnmar-myint.jpg",
//       },
//     ],
//   },

//   {
//     id: 4,
//     quarter: "Q4",
//     year_online: "2025",
//     year_blended: "2025",
//     month_online: "March-May",
//     month_blended: "June-Aug",
//     duration: "3 months",
//     module: "2 modules",
//     moduleName: ["Financial Decision Making", "Strategic Marketing Management"],
//     lecture: [
//       {
//         name: "Daw Htay Htay Myint",
//         image: "/img/teacher/daw-htay-htay-myint.jpg",
//       },
//       {
//         name: "Prof. Dr Sein Min",
//         image: "img/teacher/u-sein-min.jpg",
//       },
//     ],
//   },

//   {
//     id: 5,
//     quarter: "Q5",
//     year_online: "2025",
//     year_blended: "2025",
//     month_online: "June-Aug",
//     month_blended: "Sept-Nov",
//     duration: "3 months",
//     module: "2 modules",
//     moduleName: [
//       "Digital Transformation and Innovation Mgt",
//       "Sustainable Strategic Management",
//     ],
//     lecture: [
//       {
//         name: "Dr Tin Htay Hlaing",
//       },
//       {
//         name: "Dr Thaung Han",
//         image: "img/teacher/dr-Thaung-Han-1.jpg",
//       },
//     ],
//   },

//   {
//     id: 6,
//     quarter: "Q6",
//     year_online: "2025",
//     year_blended: "2025-2026",
//     month_online: "Sept-Nov",
//     month_blended: "Dec-Feb",
//     duration: "3 months",
//     module: "2 modules",
//     moduleName: [
//       "Entrepreneurship and Business Planning",
//       "Environmental, Social Governance & Business Ethics",
//     ],
//     lecture: [
//       {
//         name: "Daw Soe Soe",
//         image: "/img/teacher/daw-soe-soe.jpg",
//       },
//       {
//         name: "U Aung Chit Khin",
//         image: "img/teacher/uack.jpg",
//       },
//       {
//         name: "Dr. San Lwin",
//         image: "img/teacher/dr-san-lwin.jpg",
//       },
//     ],
//   },

//   {
//     id: 7,
//     quarter: "Q7",
//     year_online: "2025-2026",
//     year_blended: "2026",
//     month_online: "Dec-Feb",
//     month_blended: "March-April",
//     duration: "3 months",
//     module: "1 modules",
//     moduleName: ["Research Methodology Workshop + Capstone"],
//     lecture: [],
//   },

//   {
//     id: 8,
//     quarter: "Q8",
//     year_online: "2026",
//     year_blended: "2026",
//     month_online: "March-April",
//     month_blended: "May-July",
//     duration: "3 months",
//     module: "2 modules",
//     moduleName: ["Specialization Subjects (2) modules"],
//     lecture: [],
//   },

//   {
//     id: 9,
//     quarter: "",
//     year_online: "2026",
//     year_blended: "2026",
//     month_online: "May-August",
//     month_blended: "August-November",
//     duration: "4 months",
//     module: "",
//     moduleName: ["Capstone"],
//     lecture: [],
//   },
// ];

// const academicUpdateHeader = [
//   { id: 1, title: "Type" },
//   { id: 2, title: "Module Title" },
//   { id: 3, title: "Core" },
//   { id: 4, title: "Credits" },
// ];

// const academicData1 = [
//   {
//     id: 1,
//     type: "7AC009",
//     moduleTitle: "Financial Decision Making",
//     core: "Core",
//     credit: "30 credits",
//   },
//   {
//     id: 2,
//     type: "7BU015",
//     moduleTitle: "Sustainable Strategic Management",
//     core: "Core",
//     credit: "30 credits",
//   },
//   {
//     id: 3,
//     type: "7MG001",
//     moduleTitle: "The Masters Research Project",
//     core: "Core",
//     credit: "60 credits",
//   },
// ];

// const academicData2 = [
//   {
//     id: 1,
//     type: "7MK032",
//     moduleTitle: "Strategic Marketing Management",
//     core: "Core",
//     credit: "30 credits",
//   },
//   {
//     id: 2,
//     type: "7HR029",
//     moduleTitle: "Strategic People Management",
//     core: "Core",
//     credit: "30 credits",
//   },
//   {
//     id: 3,
//     type: "7MG001",
//     moduleTitle: "The Masters Research Project",
//     core: "Core",
//     credit: "60 credits",
//   },
// ];

// const academicSemseter1ForMSC = [
//   {
//     id: 1,
//     type: "7CC009",
//     moduleTitle: "Research Methods in Computing",
//     core: "Core",
//     credit: "20 credits",
//   },
//   {
//     id: 2,
//     type: "7CS107",
//     moduleTitle: "Advanced Artificial Intelligence and Machine Learning ",
//     core: "Core",
//     credit: "20 credits",
//   },
//   {
//     id: 3,
//     type: "7CS109",
//     moduleTitle: "Immersive Application development",
//     core: "Core",
//     credit: "20 credits",
//   },
// ];

// const academicSemseter2ForMSC = [
//   {
//     id: 1,
//     type: "7CC005",
//     moduleTitle: "Web Technologies",
//     core: "Core",
//     credit: "20 credits",
//   },
//   {
//     id: 2,
//     type: "7CS108",
//     moduleTitle: "Data Science and Data mining",
//     core: "Core",
//     credit: "20 credits",
//   },
//   {
//     id: 3,
//     type: "7CC012",
//     moduleTitle: "Mobile App Development",
//     core: "Core",
//     credit: "20 credits",
//   },
// ];

// const academicSemseter3ForMSC = [
//   {
//     id: 1,
//     type: "7CS106",
//     moduleTitle: "ITM and Computer Science Dissertation",
//     core: "Core",
//     credit: "60 credits",
//   },
// ];

function AcademicCalendar() {
  const pdfRef = useRef<HTMLDivElement>(null);

  const { isMBA, isMSC } = useSlugStore();
  // const checkOnlineOrBlended = usePath(location);

  const downloadPdf = () => {
    const pdfUrl =
      isMBA
        ? "/pdf/MBA-Calendar.pdf"
        : "/pdf/MSc-Calendar.pdf";
    downloadPdfFile(
      pdfUrl,
      `${isMBA ? "mba" : "msc"}-academic-calendar.pdf`
    );
  };


  return (
    <div id="pdf" ref={pdfRef}>
      <div className="flex justify-between">
        <Header title="Academic Calendar" />
        <DownloadPdf onDownload={downloadPdf} />
      </div>

      {isMBA && (
        <>
          {/* <div className="mt-3">
              <p className="text-gray-800 font-semibold mb-3">Semester 1</p>
              <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <Table>
                  <TableHead>
                    <tr>
                      {academicUpdateHeader.map((header) => (
                        <TableHeader key={header.id}>
                          {header.title}
                        </TableHeader>
                      ))}
                    </tr>
                  </TableHead>
                  <tbody>
                    {academicData1.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell
                          sticky
                          className={classNames(
                            item.id % 2 == 0 ? "bg-border-100" : "bg-white-100"
                          )}
                        >
                          {item.type}
                        </TableCell>
                        <TableCell>{item.moduleTitle}</TableCell>
                        <TableCell>{item.core}</TableCell>
                        <TableCell>{item.credit}</TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-gray-800 font-semibold mb-3">Semester 2</p>
              <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <Table>
                  <TableHead>
                    <tr>
                      {academicUpdateHeader.map((header) => (
                        <TableHeader key={header.id}>
                          {header.title}
                        </TableHeader>
                      ))}
                    </tr>
                  </TableHead>
                  <tbody>
                    {academicData2.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell
                          sticky
                          className={classNames(
                            item.id % 2 == 0 ? "bg-border-100" : "bg-white-100"
                          )}
                        >
                          {item.type}
                        </TableCell>
                        <TableCell>{item.moduleTitle}</TableCell>
                        <TableCell>{item.core}</TableCell>
                        <TableCell>{item.credit}</TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div> */}

          <div className="mt-8">
            <img
              src="/img/academic-calendar/mba_b5_1.jpg"
              alt="MBA1"
              className="lg:w-9/12 h-auto"
            />
            <img
              src="/img/academic-calendar/mba_b5_2.jpg"
              alt="MBA1"
              className="lg:w-9/12 h-auto"
            />
          </div>
        </>
      )}

      {isMSC && (
        <>
          <div className="mt-8">
            <img
              src="/img/academic-calendar/msc_b4_1.jpg"
              alt="MSC1"
              className="lg:w-9/12 h-auto"
            />
            <img
              src="/img/academic-calendar/msc_b4_2.jpg"
              alt="MSC1"
              className="lg:w-9/12 h-auto"
            />
          </div>
          {/* <div className="mt-3">
            <p className="text-gray-800 font-semibold mb-3">Semester 1</p>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <Table>
                <TableHead>
                  <tr>
                    {academicUpdateHeader.map((header) => (
                      <TableHeader key={header.id}>{header.title}</TableHeader>
                    ))}
                  </tr>
                </TableHead>
                <tbody>
                  {academicSemseter1ForMSC.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell
                        sticky
                        className={classNames(
                          item.id % 2 == 0 ? "bg-border-100" : "bg-white-100"
                        )}
                      >
                        {item.type}
                      </TableCell>
                      <TableCell>{item.moduleTitle}</TableCell>
                      <TableCell>{item.core}</TableCell>
                      <TableCell>{item.credit}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-gray-800 font-semibold mb-3">Semester 2</p>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <Table>
                <TableHead>
                  <tr>
                    {academicUpdateHeader.map((header) => (
                      <TableHeader key={header.id}>{header.title}</TableHeader>
                    ))}
                  </tr>
                </TableHead>
                <tbody>
                  {academicSemseter2ForMSC.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell
                        sticky
                        className={classNames(
                          item.id % 2 == 0 ? "bg-border-100" : "bg-white-100"
                        )}
                      >
                        {item.type}
                      </TableCell>
                      <TableCell>{item.moduleTitle}</TableCell>
                      <TableCell>{item.core}</TableCell>
                      <TableCell>{item.credit}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-gray-800 font-semibold mb-3">Semester 2 & 3</p>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <Table>
                <TableHead>
                  <tr>
                    {academicUpdateHeader.map((header) => (
                      <TableHeader key={header.id}>{header.title}</TableHeader>
                    ))}
                  </tr>
                </TableHead>
                <tbody>
                  {academicSemseter3ForMSC.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell
                        sticky
                        className={classNames(
                          item.id % 2 == 0 ? "bg-border-100" : "bg-white-100"
                        )}
                      >
                        {item.type}
                      </TableCell>
                      <TableCell>{item.moduleTitle}</TableCell>
                      <TableCell>{item.core}</TableCell>
                      <TableCell>{item.credit}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
}

export default AcademicCalendar;
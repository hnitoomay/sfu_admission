import { Table, TableCell, TableHead, TableHeader, TableRow } from "../Table";
import { useRef } from "react";
import { classNames, downloadPdfFile } from "../../lib/helper";
import Header from "../Header";
import DownloadPdf from "../DownloadPdf";

const academicHeader = [
  { id: 1, title: "Quarter" },
  { id: 2, title: "Type" },
  { id: 3, title: "Start Date" },
  { id: 4, title: "End Date" },
  { id: 5, title: "Duratoins" },
  { id: 6, title: "Day" },
  { id: 7, title: "Time" },
  { id: 8, title: "Module Names" },
  { id: 9, title: "Lecture" },
];

const academicData = [
  {
    id: 1,
    quarter: "Q1",
    type: ["Blended", "Purely Online"],
    startDate: "15-Jun-24",
    endDate: "24-Aug-24",
    duration: 3,
    day: ["Saturday (Online)", "Sunday (Campus)"],
    time: ["5:00 pm to 7:00 pm", "9:00 am to11:30 am"],
    moduleName: [
      "General Management  and Leadership",
      "Accounting and Financial Reporting",
    ],
    lecture: ["Daw Aye Aye Win", "Daw Khin Nwe Own"],
  },
];


function AcademicCalendarUpdate() {
  const pdfRef = useRef<HTMLDivElement>(null);

  const downloadPdf = () => {
    const pdfUrl = "/pdf/academic_calendar.pdf";
    downloadPdfFile(pdfUrl, "academic-calendar.pdf");
  };

  return (
    <div id="pdf" ref={pdfRef}>
      <div className="flex justify-between">
        <Header title="Academic Calendar" />
        <DownloadPdf onDownload={downloadPdf} />
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <Table>
          <TableHead>
            <tr>
              {academicHeader.map((header) => (
                <TableHeader key={header.id}>{header.title}</TableHeader>
              ))}
            </tr>
          </TableHead>
          <tbody>
            {academicData.map((item) => (
              <TableRow key={item.id}>
                <TableCell
                  sticky
                  className={classNames(
                    item.id % 2 == 0 ? "bg-border-100" : "bg-white-100"
                  )}
                >
                  {item.quarter}
                </TableCell>
                <TableCell>
                  {item.moduleName.map((i) => (
                    <div key={i}>
                      <p className="p-2">{i}</p>
                    </div>
                  ))}
                </TableCell>
                <TableCell>{item.startDate}</TableCell>
                <TableCell>{item.endDate} months</TableCell>
                <TableCell>{item.duration}</TableCell>
                <TableCell>{item.day}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>
                  {item.moduleName.map((i) => (
                    <div key={i}>
                      <p className="p-2">{i}</p>
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-[-4px]">
                    <img src="/img/profile1.png" alt="Profile" />
                    <img src="/img/profile1.png" alt="Profile1" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-border-100">
              <TableCell>Total</TableCell>
              <TableCell colSpan={6} className="text-right">
                8 modules
              </TableCell>
            </TableRow>
          </tbody>
        </Table>
      </div>
      {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-[50px]">
        <ProgramCard />
        <ProgramCard />
        <ProgramCard />
      </div> */}
    </div>
  );
}

export default AcademicCalendarUpdate;

import Header from "../Header";
import DownloadPdf from "../DownloadPdf";
import { downloadPdfFile } from "../../lib/helper";
import { useSlugStore } from "../../store/useSlugStore";

function PaymentInfo() {
  const { isMBA, isMSC } = useSlugStore();

  console.log("isMBA", isMBA);

  const downloadPdf = () => {
    const pdfUrl = isMBA
      ? "/pdf/MBA-Installment-Plan-2026.pdf"
      : isMSC
      ? "/pdf/MSc-Installment-Plan-2026.pdf"
      : "";
    downloadPdfFile(pdfUrl, `${isMBA ? "mba" : "msc"}-payment-plan.pdf`);
  };

  return (
    <>
      <div className="flex justify-between">
        <Header title="Payment Installment Plan" />
        <DownloadPdf onDownload={downloadPdf} />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* <table className="min-w-full">
          <thead className="bg-border-100 text-gray-800 text-center">
            <tr>
              <td
                className="p-4 border-b border-gray-100 font-bold"
                colSpan={5}
              >
                SFU MBA Program Payment Plan
              </td>
            </tr>
            <tr>
              <th className="p-6 first-col-sticky bg-border-100">
                One Time Payment Plan
              </th>
              <th className="p-6 border-b border-gray-100" colSpan={2}>
                General MBA
              </th>
              <th className="p-6 border-b border-gray-100" colSpan={2}>
                Specialized MBA (Online Only)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-gray-800 font-semibold text-sm bg-border-100 text-center">
              <td className="first-col-sticky bg-border-100"></td>
              <td className="p-4">Online</td>
              <td className="p-4">Blended</td>
              <td className="p-4">Online Students</td>
              <td className="p-4">Blended Students</td>
            </tr>
            <tr className="text-gray-800 text-center border-b border-gray-100">
              <td className="p-4 font-bold first-col-sticky bg-white-100">
                Course Fees
              </td>
              <td className="p-4">10,000,000</td>
              <td className="p-4">11,000,000</td>
              <td className="p-4">11,000,000</td>
              <td className="p-4">12,000,000</td>
            </tr>
            <tr className="text-gray-800 text-center border-b border-gray-100">
              <td className="p-4 first-col-sticky bg-white-100">
                Introductory Discount
              </td>
              <td className="p-4">(1,500,000)</td>
              <td className="p-4">(1,500,000)</td>
              <td className="p-4">(1,500,000)</td>
              <td className="p-4">(1,500,000)</td>
            </tr>
            <tr className="text-gray-800 text-center border-b border-gray-100">
              <td className="p-4 first-col-sticky bg-white-100">
                Cash Down 10%
              </td>
              <td className="p-4">(850,000)</td>
              <td className="p-4">(950,000)</td>
              <td className="p-4">(950,000)</td>
              <td className="p-4">(1,050,000)</td>
            </tr>

            <tr className="text-gray-800 text-center bg-[#FFFF00] font-bold border-b border-gray-100">
              <td className="p-4 first-col-sticky bg-[#FFFF00]">
                Discounted Course Fees
              </td>
              <td className="p-4">7,650,000</td>
              <td className="p-4">8,550,000</td>
              <td className="p-4">8,550,000</td>
              <td className="p-4">9,450,000</td>
            </tr>
          </tbody>
        </table> */}

        {isMBA && <img src="/img/MBA-Installment-Plan-2026.jpg" alt="MBA Payment" />}

        {isMSC && <img src="/img/MSc-Installment-Plan-2026.jpg" alt="MSc Payment" />}
      </div>

      {/* <>
        <Header title="Installment Plan" className="mt-[52px]" />
        <div className="grid sm:grid-cols-1 gap-12">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full bg-white-100">
              <thead className="bg-border-100 text-gray-800 text-center first-col-sticky">
                <tr>
                  <th className="p-6 first-col-sticky bg-border-100">
                    SFU Installment Payment (5 Times) (12 Months)
                  </th>
                  <th className="p-6 border-b border-gray-100" colSpan={2}>
                    General MBA
                  </th>
                  <th className="p-6 border-b border-gray-100" colSpan={2}>
                    Specialized MBA (Online Only)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-800 font-semibold text-sm bg-border-100 text-center">
                  <td className="first-col-sticky bg-border-100"></td>
                  <td className="p-4">Online</td>
                  <td className="p-4">Blended</td>
                  <td className="p-4">Online Students</td>
                  <td className="p-4">Blended Students</td>
                </tr>
                <tr className="text-gray-800 font-bold text-center border-b border-gray-100">
                  <td className="p-4 font-bold first-col-sticky bg-white-100">
                    Course Fees
                  </td>
                  <td className="p-4">11,000,000</td>
                  <td className="p-4">12,000,000</td>
                  <td className="p-4">12,000,000</td>
                  <td className="p-4">13,000,000</td>
                </tr>
                <tr className="text-gray-800 text-center border-b border-gray-100">
                  <td className="p-4 first-col-sticky bg-white-100">
                    1st Payment
                  </td>
                  <td className="p-4">(2,750,000)</td>
                  <td className="p-4">(3,000,000)</td>
                  <td className="p-4">(3,000,000)</td>
                  <td className="p-4">(3,250,000)</td>
                </tr>
                <tr className="text-gray-800 text-center border-b border-gray-100">
                  <td className="p-4 first-col-sticky bg-white-100">
                    2nd Payment
                  </td>
                  <td className="p-4">(2,062,500)</td>
                  <td className="p-4">(2,250,000)</td>
                  <td className="p-4">(2,250,000)</td>
                  <td className="p-4">(2,437,500)</td>
                </tr>
                <tr className="text-gray-800 text-center border-b border-gray-100">
                  <td className="p-4 first-col-sticky bg-white-100">
                    3rd Payment
                  </td>
                  <td className="p-4">(2,062,500)</td>
                  <td className="p-4">(2,250,000)</td>
                  <td className="p-4">(2,250,000)</td>
                  <td className="p-4">(2,437,500)</td>
                </tr>
                <tr className="text-gray-800 text-center border-b border-gray-100">
                  <td className="p-4 first-col-sticky bg-white-100">
                    4th Payment
                  </td>
                  <td className="p-4">(2,062,500)</td>
                  <td className="p-4">(2,250,000)</td>
                  <td className="p-4">(2,250,000)</td>
                  <td className="p-4">(2,437,500)</td>
                </tr>

                <tr className="text-gray-800 text-center border-b border-gray-100">
                  <td className="p-4 first-col-sticky">5th Payment</td>
                  <td className="p-4">(2,062,500)</td>
                  <td className="p-4">(2,250,000)</td>
                  <td className="p-4">(2,250,000)</td>
                  <td className="p-4">(2,437,500)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full bg-white-100">
              <thead className="bg-border-100 text-gray-800 text-center first-col-sticky">
                <tr>
                  <th className="p-6 first-col-sticky bg-border-100">
                    AYA Education Loan (24 Months)
                  </th>
                  <th className="p-6 border-b border-gray-100" colSpan={2}>
                    General MBA
                  </th>
                  <th className="p-6 border-b border-gray-100" colSpan={2}>
                    Specialized MBA (Online Only)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-800 font-semibold text-sm bg-border-100 text-center">
                  <td className="first-col-sticky bg-border-100"></td>
                  <td className="p-4">Online</td>
                  <td className="p-4">Blended</td>
                  <td className="p-4">Online Students</td>
                  <td className="p-4">Blended Students</td>
                </tr>
                <tr className="text-gray-800 text-center border-b border-gray-100">
                  <td className="p-4 font-bold first-col-sticky bg-white-100">
                    After Cash Down + Intro Course Fees for Batch -1
                  </td>
                  <td className="p-4">7,650,000</td>
                  <td className="p-4">8,550,000</td>
                  <td className="p-4">8,550,000</td>
                  <td className="p-4">9,450,000</td>
                </tr>
                <tr className="text-gray-800 text-center border-b border-gray-100">
                  <td className="p-4 first-col-sticky bg-white-100">
                    (Add)2% Service Charges
                  </td>
                  <td className="p-4">122,400</td>
                  <td className="p-4">136,800</td>
                  <td className="p-4">136,800</td>
                  <td className="p-4">151,200</td>
                </tr>
                <tr className="text-gray-800 text-center border-b border-gray-100">
                  <td className="p-4 first-col-sticky bg-white-100">
                    Downpayment 20%
                  </td>
                  <td className="p-4">1,530,000</td>
                  <td className="p-4">1,710,000</td>
                  <td className="p-4">1,710,000</td>
                  <td className="p-4">1,890,000</td>
                </tr>
                <tr className="text-gray-800 text-center border-b border-gray-100">
                  <td className="p-4 first-col-sticky bg-white-100">
                    Monthly P+I
                  </td>
                  <td className="p-4">289,521</td>
                  <td className="p-4">323,582</td>
                  <td className="p-4">323,582</td>
                  <td className="p-4">357,643</td>
                </tr>
                <tr className="text-gray-800 text-center border-b border-gray-100">
                  <td className="p-4 first-col-sticky bg-white-100">
                    Total interest for 12.5%
                  </td>
                  <td className="p-4">828,497</td>
                  <td className="p-4">925,968</td>
                  <td className="p-4">925,968</td>
                  <td className="p-4">1,023,438</td>
                </tr>

                <tr className="text-gray-800 text-center bg-[#39e75f] font-bold border-b border-gray-100">
                  <td className="p-4 first-col-sticky bg-[#39e75f]">
                    20% Down + P + I + 2%Service Charges
                  </td>
                  <td className="p-4">8,600,897</td>
                  <td className="p-4">9,612,768</td>
                  <td className="p-4">9,612,768</td>
                  <td className="p-4">10,624,638</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </> */}
    </>
  );
}

export default PaymentInfo;

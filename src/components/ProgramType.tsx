import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { classNames } from "../lib/helper";

interface ProgramTypeParams {
  type: "review" | "accept" | "reject";
  programName: string;
}

function ProgramType(props: ProgramTypeParams) {
  const { type, programName } = props;

  const borderColor =
    type == "accept"
      ? "border-green"
      : type == "review"
      ? "border-warning"
      : "border-red-50";

  const bgColor =
    type == "accept"
      ? "bg-green"
      : type == "review"
      ? "bg-warning"
      : "bg-red-50";

  const txtColor =
    type == "accept"
      ? "text-green"
      : type == "review"
      ? "text-warning"
      : "text-red-50";

  const title =
    type == "accept" ? "Accepted" : type == "review" ? "Reviewing" : "Rejected";


  return (
    <div
      className={`bg-white-100 rounded-lg border-l-4 ${borderColor} sm:py-[20px] lg:py-[40px] sm:px-[20px] lg:px-[40px] mb-[18px]`}
    >
      <div className="flex sm:flex-col md:flex-row">
        <div className="grow flex flex-col space-y-4">
          <div className="flex justify-between">
            <div>
              <img src="/img/wolve.png" alt="Wolve" />
            </div>

            {/* For mobile status */}
            <div className="sm:block md:hidden sm:flex space-x-2 items-center">
              <div className={`rounded-full w-2 h-2 ${bgColor}`}></div>
              <p className={`${txtColor} sm:text-xs`}>{title}</p>
            </div>
            {/* For mobile status */}
          </div>
          <div className="flex sm:flex-col md:flex-row md:space-x-8 sm:space-y-2">
            <p className="text-gray-800 font-semibold md:text-lg lg:text-xl">
             {programName}
            </p>
            <div className="flex space-x-2">
              <a
                href=""
                className="text-blue-100 font-semibold sm:text-xs md:text-sm lg:text-base underline underline-offset-1"
              >
                Visit Program
              </a>
              <div className="flex items-center justify-center">
                <img src="/img/a_arrow.png" alt="A Arrow" className="w-3 h-3" />
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <img src="/img/date.png" alt="Date" />
            <p className="text-gray-600 font-medium sm:text-xs lg:text-sm">
              Applied Date: 27,Mar 2024
            </p>
          </div>
        </div>

        <div className="sm:hidden md:block grow-0 w-1 h-[100px] bg-gray-50 mr-[40px]"></div>

        <div className="sm:hidden md:block grow-0">
          <div
            className={`flex space-x-2 items-center justify-center rounded-full md:border md:border-2 ${borderColor} px-[24px] py-[12px]`}
          >
            <div
              className={`rounded-full md:w-3 lg:w-5 md:h-3 lg:h-5 ${bgColor}`}
            ></div>
            <p className={`${txtColor} md:text-sm lg:text-base`}>{title}</p>
          </div>
          <div className="flex space-x-4 items-center justify-center mt-[34px]">
            <a className="text-blue-100 text-xs underline underline-offset-1">
              {type == "accept"
                ? "Continue Payment"
                : type == "reject"
                ? "See Why?"
                : null}
            </a>
            {(type == "accept" || type == "reject") && (
              <img
                src="/img/right_arrow.png"
                alt="Right Arrow"
                className="w-4 h-4"
              />
            )}
          </div>
        </div>
      </div>

      {/* For mobile payment  */}
      <div className="md:hidden flex justify-end mt-2">
        <div
          className={classNames(
            type == "review" ? "" : "p-2",
            "bg-primary flex items-center justify-center space-x-2 rounded-lg w-fit"
          )}
        >
          <a className="text-xs">
            {type === "accept"
              ? "Continue Payment"
              : type === "reject"
              ? "See Why?"
              : null}
          </a>
          {(type === "accept" || type === "reject") && (
            <EastOutlinedIcon fontSize="small" />
          )}
        </div>
      </div>
      {/* For mobile payment  */}
    </div>
  );
}

export default ProgramType;

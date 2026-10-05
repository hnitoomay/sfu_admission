import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { getExtension } from "../lib/helper";
import { useContext, useState } from "react";
import CertificateForm from "../pages/profile/form/CertificateForm";
import { CardContext } from "../hooks/context/CardContext";
import EnglishDocForm from "../pages/profile/form/EnglishDocForm";
import RecDocForm from "../pages/profile/form/RecDocForm";
interface DocCardParmas {
  title?: string;
  data: [];
  fileName: string;
  mutate: () => void;
  onDelete: (id: number) => void;
  onDownload: (item: string) => void;
}

function DocCard(props: DocCardParmas) {
  const { title, data, fileName, mutate, onDelete, onDownload } = props;

  const { type } = useContext(CardContext);

  const [showModal, setShowModal] = useState(false);

  const clickShowModal = () => {
    setShowModal(true);
  };

  const clickCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold text-gray-800">{title}</div>
        <div
          className="flex items-center cursor-pointer hover:transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          onClick={clickShowModal}
        >
          <svg
            className="w-6 h-6 mr-2 text-black-50 hover:text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
        </div>
      </div>
      {data?.length > 0 && (
        <div className="items-center bg-blue-150 p-4 rounded-lg shadow-md mb-4">
          <div className="flex flex-col lg:p-3 md:p-3 sm:space-y-4 md:space-y-8">
            {data?.map((item: string, index: number) => (
              <div className="flex justify-between" key={index}>
                <div className="flex items-center justify-center space-x-4">
                  {getExtension(item, "pdf") == "pdf" ? (
                    <img src="/img/pdf.png" alt="PDF" className="w-10 h-10" />
                  ) : (
                    <img src="/img/img.png" alt="IMG" className="w-10 h-10" />
                  )}
                  <div className="flex items-center justify-center">
                    <p className="flex-1 lg:text-base sm:text-sm font-medium text-gray-800">
                      {fileName} {index + 1}
                    </p>
                  </div>
                </div>
                <div className="flex sm:space-x-4 md:space-x-8 items-center sm:mt-2">
                  <div
                    onClick={() => onDownload(item)}
                    className="cursor-pointer hover:transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                  >
                    
                    <FileDownloadOutlinedIcon
                      sx={{
                        color: "#343330",
                        ":hover": {
                          color: "red",
                        },
                      }}
                    />
                  </div>
                  <div
                    onClick={() => onDelete(index)}
                    className="cursor-pointer hover:transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                  >
                    <DeleteOutlinedIcon
                      sx={{
                        color: "#343330",
                        ":hover": {
                          color: "red",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showModal &&
        (type === "certificate" ? (
          <CertificateForm closeModal={clickCloseModal} mutate={mutate} />
        ) : type === "english" ? (
          <EnglishDocForm closeModal={clickCloseModal} mutate={mutate} />
        ) : type === "recommend" ? (
          <RecDocForm closeModal={clickCloseModal} mutate={mutate} />
        ) : null)}
    </>
  );
}

export default DocCard;

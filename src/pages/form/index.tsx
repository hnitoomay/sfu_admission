import { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import "../../css/custom.css";
import { ProgressContext } from "../../hooks/context/ProgressContext";
import EducationInfo from "./EducationInfo";
import SuccessProgram from "./SuccessProgram";
import AuthBgLayout from "../../components/AuthBgLayout";
import ProgressBar from "../../components/ProgressBar";
import {
  createApplyProgram,
  createPersonalInfo,
} from "../../services/applyForm/applyForm";
import LoadingSpinner from "../../components/Loading";
import ModalDialog from "../../components/ModalDialog";
import { useLocation, useNavigate } from "react-router-dom";
import useScreenSize from "../../hooks/customHook/useScreenSize";
import { useTranslation } from "../../i18n/useTranslation";
interface IGetId {
  [key: number]: JSX.Element;
}

function ApplicationForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const screenSize = useScreenSize();
  const { t } = useTranslation();

  const [id, setId] = useState(0);
  const [currentId, setCurrentId] = useState(0);

  const [loading, setLoading] = useState(false);

  const [dialog, setDialog] = useState<{
    title: string;
    description: string;
  } | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const personalInfoSubmit = async (data: any) => {
    setLoading(true);

    // data bind
    const nrcNumber =
      screenSize.width <= 425 ? data.nrcNumberMobile : data.nrcNumber;
    const nrc = `${data.nrcType?.value}/${data.nrcPlace?.value}(${data.nrcNation?.value})${nrcNumber}`;
    const isSfu = data.isSfu == "true" ? 1 : 0;

    const result = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      gender: data.gender?.value,
      nrc: nrc,
      dob: data.dob,
      region: data.region?.label,
      township: data.township?.label,
      address1: data.address1,
      address2: data.address2,
      is_sfu: isSfu,
      student_id: isSfu == 0 ? "" : data.studentID,
    };

    // create to server
    const response = await createPersonalInfo(result);

    if (response.data?.message == "Successfully") {
      setId(1);
      setCurrentId(1);
    } else {
      setDialog({
        title: "Error",
        description: response.message,
      });
    }
    setLoading(false);
  };

  const nextSuccess = async () => {
    setLoading(true);

    const data = {
      program: location.state,
    };
    const response = await createApplyProgram(data);

    if (response?.message === "Successfully") {
      setLoading(false);
      console.log("ui response", response.message);
      setId(2);
      setCurrentId(2);
    }
  };

  const goBackEducation = () => {
    setId(0);
    setCurrentId(0);
  };

  const checkType = (id: number) => {
    const getId: IGetId = {
      0: <PersonalInfo onClick={personalInfoSubmit} />,
      1: <EducationInfo goBack={goBackEducation} goNext={nextSuccess} />,
      2: <SuccessProgram />,
    };

    return getId[id];
  };

  return (
    <ProgressContext.Provider value={{ currentId, id }}>
      <div className="sm:hidden md:block">
        {loading && <LoadingSpinner />}
        <AuthBgLayout className="w-full">
          <div className="px-8 py-6 flex justify-between bg-white-100 rounded-t-xl shadow-lg shadow-gray-850/20 sticky top-0 mb-8">
            <h3 className="font-bold md:text-lg lg:text-xl text-gray-800">
              {t("applicationForm.title")}
            </h3>
            <div className="w-5 h-5 cursor-pointer">
              <img
                src="/img/close.png"
                alt="Close"
                onClick={() => navigate(-1)}
              />
            </div>
          </div>
          <ProgressBar />
          {checkType(id)}
        </AuthBgLayout>
      </div>

      {/* For mobile */}
      <div className="sm:block md:hidden rounded-xl bg-white-50 px-4 py-10 border border-gray-500/10 shadow-lg backdrop-blur-md max-sm:p-6">
        <div>
          <div className="flex justify-between">
            <h3 className="font-bold md:text-lg lg:text-xl text-gray-800">
              {t("applicationForm.title")}
            </h3>
            <div className="w-5 h-5 cursor-pointer">
              <img
                src="/img/close.png"
                alt="Close"
                onClick={() => navigate("/", { replace: true })}
              />
            </div>
          </div>
          <ProgressBar />
          {checkType(id)}
        </div>
      </div>
      {/* For mobile */}

      {dialog && (
        <ModalDialog
          title={dialog.title}
          bodyText={dialog.description}
          btnRight={{
            title: "Ok",
            onClick: () => {
              setDialog(null);
            },
          }}
          onClose={() => {}}
        />
      )}
    </ProgressContext.Provider>
  );
}

export default ApplicationForm;

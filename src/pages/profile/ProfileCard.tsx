import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useGetAuthUser } from "../../services/user/getAuthUser";
import LoadingSpinner from "../../components/Loading";
import ProfileForm from "./form/ProfileForm";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTranslation } from "../../i18n/useTranslation";

function ProfileCard() {
  const { user, isErrorUser, userLoading, mutate } = useGetAuthUser();
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);

  const clickShowModal = () => {
    setShowModal(true);
  };

  const clickCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {userLoading || (isErrorUser && <LoadingSpinner />)}
      <div className="lg:w-3/12 sm:w-full md:w-full p-5">
        <div className="p-4 mb-4">
          <div className="text-lg font-bold mb-4 text-gray-900">
            {t("profile.personalInfo")}
          </div>
          <div className="bg-white-100 p-4 rounded-lg flex flex-col items-center">          
            <AccountCircleIcon sx={{ width: 150, height: 150, color: '#C0C0C0' }}  />
            <div className="text-lg font-bold mb-2 text-gray-900 my-3">
              {user?.name}
            </div>
            <span className="text-gray-500">
              {t("profile.studentId")} : {user?.student_code ? user?.student_code : ""}
            </span>
            <div 
              className="py-4 px-6 rounded-lg my-7 bg-white-50 border border-gray-900 text-gray-900 cursor-pointer"
              onClick={clickShowModal}
            >
              <EditIcon className="mr-2" />
              {t("profile.editProfile")}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <ProfileForm closeModal={clickCloseModal} mutate={mutate} />
      )}
    </>
  );
}

export default ProfileCard;

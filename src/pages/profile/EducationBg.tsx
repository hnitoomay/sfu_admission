import { useCallback, useEffect, useState } from "react";
import Card from "../../components/Card";
import EducationForm from "./form/EducationForm";
import { useGetAuthUser } from "../../services/user/getAuthUser";
import LoadingSpinner from "../../components/Loading";
import { UpdateEducationData } from "../../types/model";
import { deleteEducation } from "../../services/user/education";
import { useTranslation } from "../../i18n/useTranslation";

interface EduData extends Array<UpdateEducationData> {}

function EducationBg() {
  const { user, isErrorUser, userLoading, mutate } = useGetAuthUser();
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<EduData>([]);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState<string | null>();

  const clickShowModal = () => {
    setId(null);
    setShowModal(true);
  };

  const clickCloseModal = () => {
    setShowModal(false);
  };

  const onEditEdu = (id: string) => {
    setId(id);
    setShowModal(true);
  };

  const getEducationData = useCallback(() => {
    setLoading(true);
    const eduData = user?.education?.map((item: EduData) => item);
    setData(eduData);
    setLoading(false);
  }, [user?.education]);

  useEffect(() => {
    getEducationData();
  }, [getEducationData]);

  const deleteEdu = async (id: number) => {
    setLoading(true);
    const deleteItem = {
      education_id: id,
    };
    const response = await deleteEducation(deleteItem);
    if (response.status == "success") {
      const removeItem = data.filter((item) => item.id !== id);
      mutate(removeItem);
    }
    setLoading(false);
  };

  return (
    <>
      {(userLoading || isErrorUser || loading) && <LoadingSpinner />}
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold text-gray-800">
          {t("profile.educationBackground")}
        </div>
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

      <div className="flex flex-col space-y-4">
        {data?.map((item) => (
          <Card
            key={item.id}
            type="education"
            title1={item.university}
            title2={item.degree}
            onDelete={() => deleteEdu(item.id as number)}
            onEdit={() => onEditEdu(item.id as string)}
          />
        ))}
      </div>

      {showModal && (
        <EducationForm
          closeModal={clickCloseModal}
          mutate={mutate}
          id={id as string}
        />
      )}
    </>
  );
}

export default EducationBg;

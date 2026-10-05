import { useCallback, useEffect, useState } from "react";
import Card from "../../components/Card";
import WorkForm from "./form/WorkForm";
import { useGetAuthUser } from "../../services/user/getAuthUser";
import { UpdateWorkData } from "../../types/model";
import LoadingSpinner from "../../components/Loading";
import { deleteWork } from "../../services/user/work";
import { calculateDateDifference } from "../../lib/helper";
import { useTranslation } from "../../i18n/useTranslation";

interface WorkData extends Array<UpdateWorkData> {}

function WorkHistory() {
  const { user, isErrorUser, userLoading, mutate } = useGetAuthUser();
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<WorkData>([]);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState<string | null>();

  const clickShowModal = () => {
    setId(null);
    setShowModal(true);
  };

  const clickCloseModal = () => {
    setShowModal(false);
  };

  const onEditWork = (id: string) => {
    setId(id);
    setShowModal(true);
  };

  const getWorkData = useCallback(() => {
    setLoading(true);
    const workData = user?.work?.map((item: WorkData) => item);
    setData(workData);
    setLoading(false);
  }, [user?.work]);

  useEffect(() => {
    getWorkData();
  }, [getWorkData]);

  const deleteWk = async (id: string) => {
    setLoading(true);
    const deleteItem = {
      work_id: id,
    };

    const response = await deleteWork(deleteItem);
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
          {t("profile.workHistory")}
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
            title1={item.designation}
            title2={item.company}
            duration={calculateDateDifference(
              item.work_start_date,
              item.work_end_date
            )}
            onDelete={() => deleteWk(item.id as string)}
            onEdit={() => onEditWork(item.id as string)}
          />
        ))}
      </div>

      {showModal && (
        <WorkForm
          closeModal={clickCloseModal}
          mutate={mutate}
          id={id as string}
        />
      )}
    </>
  );
}

export default WorkHistory;

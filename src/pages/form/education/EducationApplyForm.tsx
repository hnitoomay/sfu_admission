import { useCallback, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Card from "../../../components/Card";
import { useGetAuthUser } from "../../../services/user/getAuthUser";
import { UpdateEducationData } from "../../../types/model";
import Button from "../../../components/form/Button";
import { deleteEducation } from "../../../services/user/education";
import { classNames } from "../../../lib/helper";
import LoadingSpinner from "../../../components/Loading";
import EducationForm from "../../profile/form/EducationForm";

interface EduData extends Array<UpdateEducationData> {}

interface EducationFormParams {
  mutate: () => void;
  id?: number | string;
}

function EducationApplyForm(props: EducationFormParams) {
  const { mutate } = props;

  const { user, userLoading } = useGetAuthUser();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<EduData>([]);
  const [eduId, setEduId] = useState<string | null>(null);
  const [showEduForm, setShowEduForm] = useState<boolean>(false);

  const getEducationData = useCallback(() => {
    setLoading(true);
    const eduData = user?.education?.map((item: EduData) => item);
    setData(eduData);
    setLoading(false);
  }, [user?.education]);

  useEffect(() => {
    getEducationData();
  }, [getEducationData]);

  const onEditEdu = (id: string) => {
    setEduId(id);
    setShowEduForm(!showEduForm);
  };

  const addMoreEducationHandler = () => {
    setEduId(null);
    setShowEduForm(!showEduForm);
  };

  const onDeleteEducation = async (id: number) => {
    const deleteItem = {
      education_id: id,
    };
    const response = await deleteEducation(deleteItem);
    if (response.status == "success") {
      mutate();
    }
    setLoading(false);
  };

  if (userLoading || loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white-100 p-6 sm:grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border border-gray-150 shadow-lg shadow-gray-850/10">
      <div className="flex flex-col justify-between space-y-6">
        <div>
          <p className="text-gray-800 text-lg font-semibold">
            Education Background
            <span className="ml-1 text-red-100">*</span>
          </p>

          <p className="text-gray-600 text-sm font-normal mt-2">
            Please add your completed degrees, diplomas or certifications.
          </p>
        </div>

        {user.education?.length == 0 && (
          <div className="w-full">
            <Button
              className="bg-black-100 text-white-100 rounded-md px-[24px] py-[8px]"
              onClick={addMoreEducationHandler}
            >
              <AddIcon className="mr-1" />
              Add
            </Button>
          </div>
        )}
      </div>

      {showEduForm && (
        <EducationForm
          closeModal={() => setShowEduForm(!showEduForm)}
          mutate={mutate}
          id={eduId}
        />
      )}

      {user.education?.length > 0 && (
        <div
          className={
            (classNames(
              user.education.length
                ? "border-dashed border-b-2 border-gray-150"
                : ""
            ),
            "grid sm:grid-cols-1 gap-4 mt-6")
          }
        >
          {data?.map((item) => (
            <Card
              key={item.id}
              type="education"
              title1={item.university}
              title2={item.degree}
              onDelete={() => onDeleteEducation(item.id as number)}
              onEdit={() => onEditEdu(item.id as string)}
            />
          ))}

          <div
            className="cursor-pointer mt-4"
            onClick={addMoreEducationHandler}
          >
            <p className="text-primary font-bold">+ Add More</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EducationApplyForm;

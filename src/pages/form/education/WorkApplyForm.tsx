import { useCallback, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Card from "../../../components/Card";
import { useGetAuthUser } from "../../../services/user/getAuthUser";
import { UpdateWorkData } from "../../../types/model";
import LoadingSpinner from "../../../components/Loading";
import Button from "../../../components/form/Button";
import { calculateDateDifference, classNames } from "../../../lib/helper";
import { deleteWork } from "../../../services/user/work";
import WorkForm from "../../profile/form/WorkForm";

interface WorkData extends Array<UpdateWorkData> {}

interface EducationFormParams {
  mutate: () => void;
}

function WorkApplyForm(props: EducationFormParams) {
  const { mutate } = props;

  const { user, userLoading } = useGetAuthUser();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WorkData>([]);
  const [workId, setWorkId] = useState<string | null>(null);
  const [showWorkForm, setShowWorkForm] = useState<boolean>(false);

  const getWorkData = useCallback(() => {
    setLoading(true);
    const workData = user?.work?.map((item: WorkData) => item);
    setData(workData);
    setLoading(false);
  }, [user?.work]);

  useEffect(() => {
    getWorkData();
  }, [getWorkData]);

  const onEditWork = (id: string) => {
    setWorkId(id);
    setShowWorkForm(true);
  };

  const addMoreWorkHandler = () => {
    setWorkId(null);
    setShowWorkForm(!showWorkForm);
  };

  const deleteWk = async (id: string) => {
    setLoading(true);
    const deleteItem = {
      work_id: id,
    };

    const response = await deleteWork(deleteItem);
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
            Work Experience
            <span className="ml-1 text-red-100">*</span>
          </p>
          <p className="text-gray-600 text-sm font-normal mt-2">
            Please add your work history or you can add internships or volunteer
            experience instead.
          </p>
        </div>

        {user.work?.length == 0 && (
          <div className="w-full">
            <Button
              className="bg-black-100 text-white-100 rounded-md px-[24px] py-[8px]"
              onClick={addMoreWorkHandler}
            >
              <AddIcon className="mr-1" />
              Add
            </Button>
          </div>
        )}
      </div>

      {showWorkForm && (
        <WorkForm
          closeModal={() => setShowWorkForm(!showWorkForm)}
          mutate={mutate}
          id={workId}
        />
      )}

      {user.work?.length > 0 && (
        <div
          className={
            (classNames(
              user.work.length ? "border-dashed border-b-2 border-gray-150" : ""
            ),
            "grid sm:grid-cols-1 gap-4 mt-6")
          }
        >
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

          <div className="cursor-pointer mt-4" onClick={addMoreWorkHandler}>
            <p className="text-primary font-bold">+ Add More</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkApplyForm;

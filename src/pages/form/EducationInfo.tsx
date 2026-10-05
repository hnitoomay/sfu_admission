import { useGetAuthUser } from "../../services/user/getAuthUser";
import LoadingSpinner from "../../components/Loading";
import EducationApplyForm from "./education/EducationApplyForm";
import WorkApplyForm from "./education/WorkApplyForm";
import EnglishProficiencyForm from "./education/EnglishProficiencyForm";
import RecomendationForm from "./education/RecomendationForm";
import Button from "../../components/form/Button";
import { useState } from "react";

interface EducationInfoParams {
  goBack: () => void;
  goNext: () => void;
}

function EducationInfo(props: EducationInfoParams) {
  const { goBack, goNext } = props;
  const { user, isErrorUser, userLoading, mutate } = useGetAuthUser();
  const [checked, setChecked] = useState(false);

  const onChangeHandler = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <div className="overflow-y-scroll md:h-[300px] lg:h-[450px] md:p-10">
        {(userLoading || isErrorUser) && <LoadingSpinner />}
        <div className="flex flex-col space-y-4">
          <EducationApplyForm mutate={mutate} />

          <WorkApplyForm mutate={mutate} />

          <EnglishProficiencyForm mutate={mutate} onChange={onChangeHandler} />

          <RecomendationForm mutate={mutate} />
        </div>
      </div>

      <div className="md:px-8 py-4 flex items-center justify-between bg-white-100 rounded-b-xl shadow-inner shadow-gray-850/20 sticky bottom-0">
        <Button tertiary onClick={goBack} className="sm:w-40">
          Previous
        </Button>

        <Button
          primary
          className="sm:w-40"
          onClick={goNext}
          isDisabled={
            user?.education.length === 0 ||
            user?.work.length === 0 ||
            user?.rec_letters.length === 0 ||
            (!checked && user?.english_result.length === 0)
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default EducationInfo;

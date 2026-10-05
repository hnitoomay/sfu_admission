import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { applyProgramSchema } from "../../lib/validation/ApplyProgram";
import Button from "../../components/form/Button";
import TextArea from "../../components/form/TextArea";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetAuthUser } from "../../services/user/getAuthUser";
import LoadingSpinner from "../../components/Loading";
import RadioButton from "../../components/form/RadioButton";
import { PROGRAMARR, WEEK } from "../../types/enum";
import ReactSelect from "../../components/form/ReactSelect";

interface ApplyProgramParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: any) => void;
  goBack: () => void;
}

function ApplyProgram(props: ApplyProgramParams) {
  const { onClick, goBack } = props;

  const { user, isErrorUser, userLoading } = useGetAuthUser();

  const [loading, setLoading] = useState(false);
  const [week, setWeek] = useState(0);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(applyProgramSchema),
  });

  const { handleSubmit, setValue } = methods;

  const userDetail = useMemo(
    () => ({
      program: PROGRAMARR.filter(
        (item) => item.value == user?.document[0]?.program
      )[0],
      personalStatement: user?.document[0]?.personal_statement,
    }),
    [user]
  );

  const getUserData = useCallback(() => {
    setLoading(true);
    for (const [key, value] of Object.entries(userDetail)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(key as any, value as any);
    }
    setValue("program", "");
    setLoading(false);
  }, [setValue, userDetail]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const availableDateHandler = (value: number) => {
    setWeek(value);
  };

  const programData = PROGRAMARR.filter(
    (item) => item.value != userDetail?.program?.value
  ).map((item) => ({
    label: item.label,
    value: item.value,
  }));

  return (
    <div className="overflow-y-auto scrollbar-hide h-84 px-1">
      {(userLoading || isErrorUser || loading) && <LoadingSpinner />}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onClick)} className="md:mt-[70px]">
          <div className="flex-col space-y-6 mb-[20px]">
            <ReactSelect
              id="program"
              label="Program you wish to apply for"
              optionsObject={programData}
              placeholder="Select"
              requiredField
            />

            <TextArea id="personalStatement" label="Statement of Purpose" />

            <>
              <p className="text-gray-800 font-medium text-[16px] mb-3">
                Available Days for Entrance Interview:
              </p>
              <div className="flex flex-col">
                <RadioButton
                  id="interviewTime"
                  onChange={() => availableDateHandler(WEEK.weekdays)}
                  label="Weekdays"
                  value={week}
                  checked={week == 0}
                  className="rounded-xl"
                />
                <RadioButton
                  id="interviewTime"
                  onChange={() => availableDateHandler(WEEK.weekends)}
                  label="Weekends"
                  value={week}
                  checked={week == 1}
                  className="rounded-xl"
                />
                <RadioButton
                  id="interviewTime"
                  onChange={() => availableDateHandler(WEEK.both)}
                  label="Both weekends & weekdays"
                  value={week}
                  checked={week == 2}
                  className="rounded-xl"
                />
              </div>
            </>
          </div>

          <div className="float-left bottom-0">
            <Button tertiary onClick={goBack} className="sm:w-40">
              Previous
            </Button>
          </div>

          <div className="float-right bottom-0">
            <Button secondary type="submit" className="sm:w-40">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default ApplyProgram;

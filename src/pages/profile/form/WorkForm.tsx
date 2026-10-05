import { FormProvider, useForm } from "react-hook-form";
import ModalComp from "../../../components/Modal";
import DatePicker from "../../../components/form/DatePicker";
import Button from "../../../components/form/Button";
import "../../../css/customDatePicker.css";
import Input from "../../../components/form/Input";
import { useCallback, useEffect, useMemo, useState } from "react";
import { addWork, updateWork } from "../../../services/user/work";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileWorkSchema } from "../../../lib/validation/work/profileWork";
import { useGetAuthUser } from "../../../services/user/getAuthUser";
import { UpdateWorkData } from "../../../types/model";
import LoadingSpinner from "../../../components/Loading";
import { useTranslation } from "../../../i18n/useTranslation";

interface WorkFormParams {
  closeModal: () => void;
  mutate: () => void;
  id?: number | string | null;
}

function WorkForm(props: WorkFormParams) {
  const { closeModal, mutate, id } = props;
  const { t } = useTranslation();

  const { user, userLoading } = useGetAuthUser();
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(profileWorkSchema),
  });

  const { handleSubmit, setValue } = methods;

  const workData = user?.work?.filter((item: UpdateWorkData) => item.id == id);

  const userDetail = useMemo(
    () => ({
      company: workData[0]?.company,
      industry: workData[0]?.industry,
      designation: workData[0]?.designation,
      workStartDate: workData[0]?.work_start_date,
      workEndDate: workData[0]?.work_end_date,
    }),
    [workData]
  );

  const getUserData = useCallback(() => {
    setLoading(true);
    for (const [key, value] of Object.entries(userDetail)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(key as any, value as any);
    }
    setLoading(false);
  }, [setValue]);

  useEffect(() => {
    if (id !== null) {
      getUserData();
    }
  }, [getUserData, id]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setLoading(true);

    const result = {
      company: data.company,
      industry: data.industry,
      designation: data.designation,
      work_start_date: data.workStartDate,
      work_end_date: data.workEndDate,
      work_id: id !== null && id,
    };

    // create to server
    const response =
      id === null ? await addWork(result) : await updateWork(result);
    // const respose = await addWork(result) 
    if (response.message == "Successfully") {
      mutate();
      closeModal();
    } else {
      console.log("fail");
    }
    setLoading(false);
  };

  if (userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ModalComp
      openModal={true}
      closeModal={closeModal}
      title={t("profile.addNewWork")}
    >

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <Input id="company" label={t("profile.organizationCompany")} />

            <Input id="industry" label={t("profile.industry")} placeholder={t("profile.industryPlaceholder")} />

            <Input
              id="designation"
              label={t("profile.designation")}
              placeholder={t("profile.designationPlaceholder")}
            />

            <div className="flex w-full space-x-2">
              <DatePicker id="workStartDate" label={t("profile.startDate")} requiredField />
              <div className="flex items-center justify-center">
                <p className="text-gray-800 text-base">{t("profile.to")}</p>
              </div>
              <DatePicker id="workEndDate" label={t("profile.endDate")} requiredField />
            </div>
          </div>

          <div className="md:float-right">
            <Button
              primary
              type="submit"
              className="w-full"
              isDisabled={loading}
            >
              <div className="flex items-center justify-center">
                {loading && (
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="mr-2 animate-spin"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                  </svg>
                )}
                {t("profile.save")}
              </div>
            </Button>
          </div>
        </form>
      </FormProvider>
    </ModalComp>
  );
}

export default WorkForm;

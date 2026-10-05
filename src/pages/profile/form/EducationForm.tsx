import { FormProvider, useForm } from "react-hook-form";
import ModalComp from "../../../components/Modal";
import DatePicker from "../../../components/form/DatePicker";
import Button from "../../../components/form/Button";
import "../../../css/customDatePicker.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { addEduction, updateEducation } from "../../../services/user/education";
import Input from "../../../components/form/Input";
import { profileEducationSchema } from "../../../lib/validation/education/profileEducation";
import { useGetAuthUser } from "../../../services/user/getAuthUser";
import { UpdateEducationData } from "../../../types/model";
import LoadingSpinner from "../../../components/Loading";
import MultipleFileInput from "../../../components/form/MultipleFileInput";
import { getExtension } from "../../../lib/helper";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useTranslation } from "../../../i18n/useTranslation";

interface EducationFormParams {
  closeModal: () => void;
  mutate: () => void;
  id?: number | string | null;
}

function EducationForm(props: EducationFormParams) {
  const { closeModal, mutate, id } = props;
  const { t } = useTranslation();

  const { user, userLoading } = useGetAuthUser();
  const [loading, setLoading] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState<number[]>([]);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(profileEducationSchema),
  });

  const { handleSubmit, setValue } = methods;

  const eduData = user?.education?.filter(
    (item: UpdateEducationData) => item.id == id
  );

  const userDetail = useMemo(
    () => ({
      university: eduData[0]?.university,
      degree: eduData[0]?.degree,
      field: eduData[0]?.field_of_study,
      eduStartDate: eduData[0]?.field_of_study_start_date,
      eduEndDate: eduData[0]?.field_of_study_end_date,
      certificateDoc: eduData[0]?.certificate_doc,
    }),
    [eduData]
  );

  const getUserData = useCallback(() => {
    setLoading(true);
    for (const [key, value] of Object.entries(userDetail)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(key as any, value as any);
    }
    setFileData(eduData[0]?.certificate_doc);
    setValue("certificateDoc", eduData[0]?.certificate_doc);
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
      university: data.university,
      degree: data.degree,
      field_of_study: data.field,
      field_of_study_start_date: data.eduStartDate,
      field_of_study_end_date: data.eduEndDate,
      education_id: id !== null && id,
      certificate_doc: data.certificateDoc,
      delete_certificate: String(deleteIndex),
    };

    // create to server
    const response =
      id === null || undefined
        ? await addEduction(result)
        : await updateEducation(result);

    if (response.message == "Successfully") {
      mutate();
      closeModal();
    } else {
      console.log("fail");
    }
    setLoading(false);
  };

  const onDeleteFileHandler = (item: number) => {
    setFileData((prevFileData) =>
      prevFileData.filter((_, index) => index !== item)
    );

    setDeleteIndex((prevDeleteIndex) => [...prevDeleteIndex, item]);
  };

  if (userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ModalComp
        openModal={true}
        closeModal={closeModal}
        title={t("profile.addNewEducation")}
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <Input id="university" label={t("profile.university")} />

              <Input id="degree" label={t("profile.completedDegree")} />

              <Input id="field" label={t("profile.fieldOfStudy")} />

              <div className="flex w-full space-x-2">
                <DatePicker
                  id="eduStartDate"
                  label={t("profile.startDate")}
                  requiredField
                />
                <div className="flex items-center justify-center">
                  <p className="text-gray-800 text-base">{t("profile.to")}</p>
                </div>
                <DatePicker id="eduEndDate" label={t("profile.endDate")} requiredField />
              </div>

              <div className="md:col-span-2">
                <MultipleFileInput
                  id="certificateDoc"
                  label={t("profile.attachAcademicDocuments")}
                  type="file"
                  placeholder={t("profile.attachHere")}
                  infoText={t("profile.academicDocumentInfo")}
                />

                {fileData?.length > 0 &&
                  fileData?.map((item: string, index: number) => (
                    <div
                      className="bg-white-150 flex items-center justify-between rounded-lg p-4 mb-4"
                      key={index}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        {getExtension(item, "pdf") == "pdf" ? (
                          <img
                            src="/img/pdf.png"
                            alt="PDF"
                            className="w-10 h-10"
                          />
                        ) : (
                          <img
                            src="/img/img.png"
                            alt="IMG"
                            className="w-10 h-10"
                          />
                        )}
                        <p className="flex-1 lg:text-base sm:text-sm font-medium text-gray-800">
                          {t("profile.certificateDocument")} {index + 1}
                        </p>
                      </div>
                      <div
                        onClick={() => onDeleteFileHandler(index)}
                        className="cursor-pointer"
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
                  ))}
              </div>
            </div>

            <div className="md:float-right">
              <Button primary type="submit" isDisabled={loading}>
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
    </>
  );
}

export default EducationForm;

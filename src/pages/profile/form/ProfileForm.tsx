import { FormProvider, useForm } from "react-hook-form";
import ModalComp from "../../../components/Modal";
import ReactSelect, {
  ReactSelectOption,
} from "../../../components/form/ReactSelect";
import DatePicker from "../../../components/form/DatePicker";
import Button from "../../../components/form/Button";
import "../../../css/customDatePicker.css";
import Input from "../../../components/form/Input";
import { useCallback, useEffect, useMemo, useState } from "react";
import LoadingSpinner from "../../../components/Loading";
import { GENDERARR, NRCNATIONARR } from "../../../types/enum";
import {
  DIVISIONARR,
  NRCCODEARR,
  NRCPLACEARR,
  afterParaethseses,
  afterSlash,
  beforeSlash,
  insideParentheses,
} from "../../../lib/helper";
import { useGetAuthUser } from "../../../services/user/getAuthUser";
import townshipData from "../../../data/township.json";
import { updateProfile } from "../../../services/user/profile";
import { updateProfileSchema } from "../../../lib/validation/PersonalInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "../../../i18n/useTranslation";

interface WorkFormParams {
  closeModal: () => void;
  mutate: () => void;
}

function ProfileForm(props: WorkFormParams) {
  const { closeModal, mutate } = props;
  const { t } = useTranslation();

  const { user, isErrorUser, userLoading } = useGetAuthUser();

  const [loading, setLoading] = useState(false);
  const [division, setDivision] = useState<ReactSelectOption | null>();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate());

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(updateProfileSchema),
  });

  const { handleSubmit, setValue } = methods;
  const genderOptions = useMemo(
    () =>
      GENDERARR.map((item) => ({
        ...item,
        label:
          item.value === "male" ? t("profile.male") : t("profile.female"),
      })),
    [t]
  );

  const userDetail = useMemo(
    () => ({
      studentID: user?.student_code,
      name: user?.name,
      gender: GENDERARR.filter((item) => item.value == user?.gender)[0],
      dob: user?.dob,
      region: DIVISIONARR.filter((item) => item.label == user?.region)[0],
      township: townshipData
        .filter((twn) => twn.name == user?.township)
        .map((item) => ({
          label: item.name,
          value: item.id,
        }))[0],
      address1: user?.address1,
      address2: user?.address2,
      email: user?.email,
      phone: user?.phone,
      nrcType: NRCCODEARR.filter(
        (item) => item.value == parseInt(beforeSlash(user?.nrc))
      )[0],
      nrcPlace: NRCPLACEARR.filter(
        (item) => item.value == afterSlash(user?.nrc)
      )[0],
      nrcNation: NRCNATIONARR.filter(
        (item) => item.value == insideParentheses(user?.nrc)
      )[0],
      nrcNumber: afterParaethseses(user?.nrc),
    }),
    [user]
  );

  const handleSelectRegion = (option: ReactSelectOption | null) => {
    if (option !== null) {
      setDivision(option);
      setValue("region", option);
      setValue("township", "");
    } else {
      setDivision(null);
    }
  };

  // township
  const TOWNSHIPARR =
    division && division.value
      ? townshipData
          .filter((item) => item.division_id == division.value)
          .map((item) => ({
            label: item.name,
            value: item.id,
            division_id: item.division_id,
          }))
      : userDetail?.region
      ? townshipData
          .filter((item) => item.division_id == userDetail?.region.value)
          .map((item) => ({
            label: item.name,
            value: item.id,
            division_id: item.division_id,
          }))
      : [];

  const getUserData = useCallback(() => {
    setLoading(true);
    for (const [key, value] of Object.entries(userDetail)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(key as any, value as any);
    }
    setLoading(false);
  }, [setValue, userDetail]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setLoading(true);

    const nrc = `${data.nrcType?.value}/${data.nrcPlace?.value}(${data.nrcNation?.value})${data.nrcNumber}`;
    const result = {
      name: data.name,
      gender: data.gender.value,
      nrc: nrc,
      dob: data.dob,
      region: data.region.label,
      township: data.township?.label,
      address1: data.address1,
      address2: data.address2,
      is_sfu: userDetail?.studentID ? 1 : 0,
      student_id: userDetail?.studentID,
    };

    // create to server
    const response = await updateProfile(result);
    if (response.message == "Successfully") {
      mutate();
      closeModal();
    } else {
      console.log("fail");
    }
    setLoading(false);
  };
  
  return (
    <ModalComp
      openModal={true}
      closeModal={closeModal}
      title={t("profile.editPersonalInfo")}
    >
      {(userLoading || isErrorUser || loading) && <LoadingSpinner />}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-[20px]">
            <Input id="name" label={t("profile.name")} />
            <Input id="studentID" label={t("profile.studentId")} disabled />

            <ReactSelect
              id="gender"
              label={t("profile.gender")}
              optionsObject={genderOptions}
              placeholder={t("profile.selectGender")}
              requiredField
            />

            <DatePicker id="dob" label={t("profile.dateOfBirth")} maxDate={tomorrow} />

            <div className="sm:hidden md:inline-flex flex space-x-4">
              <div className="grow-0">
                <ReactSelect
                  id="nrcType"
                  optionsObject={NRCCODEARR}
                  label={t("profile.nrcInformation")}
                  requiredField
                />
              </div>

              <div className="grow">
                <ReactSelect
                  id="nrcPlace"
                  optionsObject={NRCPLACEARR}
                  label={t("profile.nrcInformation")}
                  className="text-white-50"
                  requiredField
                />
              </div>
            </div>

            <div className="sm:hidden md:inline-flex items-end space-x-4">
              <div className="grow-0">
                <ReactSelect
                  id="nrcNation"
                  optionsObject={NRCNATIONARR}
                  className="text-white-50"
                  requiredField
                />
              </div>

              <div className="grow">
                <Input
                  id="nrcNumber"
                  className="text-white-50"
                  customCss="mb-0"
                />
              </div>
            </div>

            <ReactSelect
              id="region"
              optionsObject={DIVISIONARR}
              placeholder={t("profile.selectRegion")}
              label={t("profile.address")}
              onChange={handleSelectRegion}
              requiredField
            />

            <ReactSelect
              id="township"
              optionsObject={TOWNSHIPARR}
              placeholder={t("profile.selectTownship")}
              label={t("profile.address")}
              requiredField
              className="sm:hidden md:block text-white-50"
            />

            <div className="md:col-span-2">
              <Input id="address1" placeholder={t("profile.address1")} />
              <Input id="address2" placeholder={t("profile.address2")} />
            </div>

            <Input
              id="email"
              type="email"
              label={t("profile.email")}
              placeholder={t("profile.emailPlaceholder")}
              disabled
            />

            <Input
              id="phone"
              label={t("profile.phoneNumber")}
              type="number"
              placeholder="Enter your phone number"
              disabled
            />
          </div>

          <div className="md:float-right">
            <Button
              secondary
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
                {t("profile.update")}
              </div>
            </Button>
          </div>
        </form>
      </FormProvider>
    </ModalComp>
  );
}

export default ProfileForm;

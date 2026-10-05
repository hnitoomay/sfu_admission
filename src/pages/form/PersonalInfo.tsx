import { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  personalInfoSchema,
} from "../../lib/validation/PersonalInfo";
import "../../css/custom.css";
import townshipData from "../../data/township.json";
import {
  DIVISIONARR,
  NRCCODEARR,
  NRCPLACEARR,
  afterParaethseses,
  afterSlash,
  beforeSlash,
  insideParentheses,
} from "../../lib/helper";
import Input from "../../components/form/Input";
import DatePicker from "../../components/form/DatePicker";
import ReactSelect, {
  ReactSelectOption,
} from "../../components/form/ReactSelect";
import Button from "../../components/form/Button";
import { GENDERARR, NRCNATIONARR } from "../../types/enum";
import { useGetAuthUser } from "../../services/user/getAuthUser";
import LoadingSpinner from "../../components/Loading";
import RadioButton from "../../components/form/RadioButton";
import nrcData from "../../data/nrc.json";
interface PersonalInfoParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: any) => void;
}

function PersonalInfo(props: PersonalInfoParams) {
  const { onClick } = props;

  const { user, isErrorUser, userLoading } = useGetAuthUser();

  const [isSfu, setIsSfu] = useState<boolean>();
  const [division, setDivision] = useState<ReactSelectOption | null>();
  const [nrcCode, setNrcCode] = useState<ReactSelectOption | null>();
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() - 1);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(personalInfoSchema),
  });

  const { handleSubmit, setValue } = methods;

  const handleSelectRegion = (option: ReactSelectOption | null) => {
    if (option !== null) {
      setDivision(option);
      setValue("region", option);
      setValue("township", "");
    } else {
      setDivision(null);
    }
  };

  const handleSelectNrcCode = (option: ReactSelectOption | null) => {
    if (option !== null) {
      setNrcCode(option);
      setValue("nrcType", option);
      setValue("nrcPlace", "");
    } else {
      setNrcCode(null);
    }
  };

  const userDetail = useMemo(
    () => ({
      isSfu: user?.is_sfu == 1 ? true : false,
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

  // NRCPlace
  const getNrcPlaceArr = nrcData.data
    .filter((item) => item.nrc_code == nrcCode?.label)
    .map((item) => ({
      label: item.name_en,
      value: item.name_en,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const getUserData = useCallback(() => {
    setLoading(true);
    for (const [key, value] of Object.entries(userDetail)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(key as any, value as any);
    }
    setValue("isSfu", userDetail.isSfu ? "true" : "false");
    setLoading(false);
  }, [setValue, userDetail]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    setIsSfu(userDetail?.isSfu);
  }, [userDetail?.isSfu]);

  const sfuHandler = (value: boolean) => {
    setIsSfu(value);
  };

  useEffect(() => {
    setIsSfu(userDetail?.isSfu);
  }, [userDetail]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onClick)}>
        <div className="overflow-y-scroll md:h-[300px] lg:h-[450px] md:p-10">
          {(userLoading || isErrorUser || loading) && <LoadingSpinner />}
          <div>
            <p className="text-gray-800 font-medium text-[16px] mb-3">
              Are you an alumni of Strategy First?
            </p>
            <div className="flex space-x-10">
              <RadioButton
                id="isSfu"
                onChange={() => sfuHandler(true)}
                label="Yes"
                value="true"
                checked={isSfu == true}
                className="rounded-xl"
              />
              <RadioButton
                id="isSfu"
                onChange={() => sfuHandler(false)}
                label="No"
                value="false"
                checked={isSfu == false}
                className="rounded-xl"
              />
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                {isSfu && (
                  <Input
                    id="studentID"
                    label="Your Student ID"
                    placeholder="Enter your student ID"
                  />
                )}
                <Input
                  id="name"
                  label="Your Name"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-[20px]">
                <ReactSelect
                  id="gender"
                  label="Gender"
                  optionsObject={GENDERARR}
                  placeholder="Select Gender"
                  requiredField
                />
              </div>

              <div className="mb-[20px]">
                <DatePicker id="dob" label="Date Of Birth" maxDate={tomorrow} />
              </div>

              <div className="sm:col-span-1 md:col-span-2">
                <p className="text-sm font-medium text-gray-800 text-left mb-1">
                  NRC Infomation
                </p>
                <div className="flex sm:space-x-2 md:space-x-4">
                  <div className="grow-0">
                    <ReactSelect
                      id="nrcType"
                      optionsObject={NRCCODEARR}
                      requiredField
                      onChange={handleSelectNrcCode}
                    />
                  </div>

                  <div className="grow">
                    <ReactSelect
                      id="nrcPlace"
                      optionsObject={getNrcPlaceArr}
                      requiredField
                    />
                  </div>

                  <div className="grow-0">
                    <ReactSelect
                      id="nrcNation"
                      optionsObject={NRCNATIONARR}
                      requiredField
                    />
                  </div>

                  <div className="grow">
                    <Input
                      id="nrcNumber"
                    />
                  </div>
                </div>
              </div>

              <ReactSelect
                id="region"
                optionsObject={DIVISIONARR}
                placeholder="Select Region"
                label="Address"
                onChange={handleSelectRegion}
                requiredField
              />

              <ReactSelect
                id="township"
                optionsObject={TOWNSHIPARR}
                placeholder="Select Township"
                label="Address"
                requiredField
                className="sm:hidden md:block text-white-50"
              />

              <div className="md:col-span-2">
                <Input id="address1" placeholder="Address 1" />
                <Input id="address2" placeholder="Address 2" />
              </div>

              <Input
                id="email"
                type="email"
                label="Email"
                placeholder="Enter your email here"
              />

              <Input
                id="phone"
                label="Phone Number"
                type="number"
                placeholder="09xxxxxxxxx"
              />
            </div>
          </div>
        </div>

        <div className="md:px-8 md:py-4 flex items-center justify-end bg-white-100 rounded-b-xl shadow-inner shadow-gray-850/20 sticky bottom-0">
          <Button type="submit" className="sm:w-full md:w-40 bg-primary text-white-100">
            Next
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default PersonalInfo;

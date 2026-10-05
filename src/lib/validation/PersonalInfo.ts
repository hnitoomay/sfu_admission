/* eslint-disable @typescript-eslint/no-explicit-any */
import { InferType, mixed, object, string } from "yup";
import {
  emailErrMsg,
  maxErrMsg,
  maxLenErrMsg,
  minErrMsg,
  requiredErrMsg,
} from "./validation-message";

export const personalInfoSchema = object({
  name: string().required(requiredErrMsg("Name")),
  gender: mixed().test(
    "Select-Required",
    requiredErrMsg("Gender"),
    function (data: any) {
      if (
        data?.value === undefined ||
        data?.value === null ||
        data?.value === ""
      ) {
        return false;
      }
      return true;
    }
  ),
  dob: string().required(requiredErrMsg("Date of Birth")),
  address1: string().required(requiredErrMsg("Address 1")),
  address2: string().nullable().notRequired(),
  region: mixed().test(
    "Select-Required",
    requiredErrMsg("Region"),
    function (data: any) {
      if (
        data?.value === undefined ||
        data?.value === null ||
        data?.value === ""
      ) {
        return false;
      }
      return true;
    }
  ),
  township: mixed().test(
    "Select-Required",
    requiredErrMsg("Township"),
    function (data: any) {
      if (
        data?.value === undefined ||
        data?.value === null ||
        data?.value === ""
      ) {
        return false;
      }
      return true;
    }
  ),
  email: string()
    .email(emailErrMsg)
    .required(requiredErrMsg("Email"))
    .max(50, maxLenErrMsg(50)),
  phone: string()
    .required(requiredErrMsg("Phone"))
    .min(0, minErrMsg(0))
    .max(11, maxErrMsg(11)),
  nrcType: mixed().test(
    "Select-Required",
    requiredErrMsg("NRC Type"),
    function (data: any) {
      if (
        data?.value === undefined ||
        data?.value === null ||
        data?.value === ""
      ) {
        return false;
      }
      return true;
    }
  ),
  nrcPlace: mixed().test(
    "Select-Required",
    requiredErrMsg("NRC Place"),
    function (data: any) {
      if (
        data?.value === undefined ||
        data?.value === null ||
        data?.value === ""
      ) {
        return false;
      }
      return true;
    }
  ),

  nrcNation: mixed().test(
    "Select-Required",
    requiredErrMsg("NRC Nation"),
    function (data: any) {
      if (
        data?.value === undefined ||
        data?.value === null ||
        data?.value === ""
      ) {
        return false;
      }
      return true;
    }
  ),
  nrcNumber: string()
    .required(requiredErrMsg("Number"))
    .test('len', 'Must be exactly 6 numbers', val => val.length === 6),
  nrcNumberMobile: string().notRequired(),
  isSfu: string().required(requiredErrMsg("Sfu Student")),
  studentID: string()
    .nullable()
    .notRequired()
    .test(
      "conditional-student-id",
      "Student ID is required",
      function (value, context) {
        const { isSfu } = context.parent;
        if (isSfu == "true") {
          return value != null && value.trim() !== "";
        }
        return true;
      }
    ),
});

export const personalInfoSchemaForMobile = personalInfoSchema.shape({
  nrcNumberMobile: string()
  .required(requiredErrMsg("Number"))
  .test('len', 'Must be exactly 6 numbers', val => val.length === 6),
})

export const updateProfileSchema = personalInfoSchema.shape({
  email: string().notRequired(),
  phone: string().notRequired(),
  studentID: string().notRequired(),
  isSfu: string().notRequired(),
});

export type PersonalInfoVType = InferType<typeof personalInfoSchema>;

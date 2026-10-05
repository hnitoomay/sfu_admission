/* eslint-disable @typescript-eslint/no-explicit-any */
import { mixed, object, string } from "yup";
import { requiredErrMsg } from "./validation-message";

export const applyProgramSchema = object({
  program: mixed().test(
    "Select-Required",
    requiredErrMsg("Program"),
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
  personalStatement: string()
    .required(requiredErrMsg("Statement"))
    .test(
      "len",
      "Must be less than 1000 characters",
      (val: any) => val.length <= 1000
    ),
  interviewTime: string().nullable().notRequired(),
});

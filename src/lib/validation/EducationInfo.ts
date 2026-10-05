/* eslint-disable @typescript-eslint/no-explicit-any */
import { array, boolean, mixed, object, string } from "yup";
import { dateErrMsg, requiredErrMsg } from "./validation-message";
import { MAX_FILE_SIZE, isValidFileType } from "../helper";
import { DATE_FORMAT_REGEX } from "./validation-format";

export const educationInfoSchema = object({
  university: string().required(requiredErrMsg("University")),
  degree: string().required(requiredErrMsg("Degree")),
  field: string().required(requiredErrMsg("Fieild")),
  eduStartDate: string()
    .required(requiredErrMsg("Start Date"))
    .matches(DATE_FORMAT_REGEX, dateErrMsg("Start Date")),
  eduEndDate: string()
    .required(requiredErrMsg("End Date"))
    .matches(DATE_FORMAT_REGEX, dateErrMsg("End Date"))
    .test(
      "dateTest",
      "End Date must be greater than Start Date",
      function (value) {
        const ed = new Date(value).getTime();
        const sd = new Date(this.parent.eduStartDate).getTime();
        if (ed > sd) {
          return true;
        } else {
          return false;
        }
      }
    ),
  certificateDoc: array()
    .of(
      mixed()
        .required("Certificate Document is required")
        .test(
          "fileType",
          "Unsupported File Format",
          (value: any) => value && isValidFileType(value.name, "type")
        )
        .test(
          "is-valid-size",
          "Max allowed size is 2MB",
          (value: any) => value && value.size <= MAX_FILE_SIZE
        )
    )
    .required("At least one Certificate Document is required")
    .min(1, "At least one Certificate Document is required")
    .max(5, "Maximum 5"),
  company: string().required(requiredErrMsg("Company")),
  industry: string().required(requiredErrMsg("Industry")),
  designation: string().required(requiredErrMsg("Designation")),
  workStartDate: string()
    .required(requiredErrMsg("Start Date"))
    .matches(DATE_FORMAT_REGEX, dateErrMsg("Start Date")),
  workEndDate: string()
    .required(requiredErrMsg("End Date"))
    .matches(DATE_FORMAT_REGEX, dateErrMsg("End Date"))
    .test(
      "dateTest",
      "End Date must be greater than Start Date",
      function (value) {
        const ed = new Date(value).getTime();
        const sd = new Date(this.parent.workStartDate).getTime();
        if (ed > sd) {
          return true;
        } else {
          return false;
        }
      }
    ),
  englishPro: boolean().nullable().notRequired(),
  english_results: array()
    .of(
      mixed()
        .nullable()
        .notRequired()
        .test("English result is required", function (value: any, context) {
          const { englishPro } = context.parent;
          if (!englishPro) {
            if (!value) {
              return this.createError({
                message: "English Result is required",
              });
            }
            if (!isValidFileType(value.name?.toLowerCase(), "type")) {
              return this.createError({ message: "Unsupported File Format" });
            }
            if (value.size > MAX_FILE_SIZE) {
              return this.createError({ message: "Max allowed size is 2MB" });
            }
          }
          return true;
        })
    )
    .max(5, "Maximum 5"),
  workRecomendation: array()
    .of(
      mixed()
        .required("Recomendation Letter is required")
        .test(
          "fileType",
          "Unsupported File Format",
          (value: any) => value && isValidFileType(value.name, "type")
        )
        .test(
          "is-valid-size",
          "Max allowed size is 2MB",
          (value: any) => value && value.size <= MAX_FILE_SIZE
        )
    )
    .required("At least one Recomendation Letter is required")
    .min(1, "At least one Recomendation Letter is required")
    .max(5, "Maximum 5"),
});

export const notSfuEducationInfoSchema = educationInfoSchema.shape({
  workRecomendation: array()
    .of(
      mixed()
        .required("Recomendation Letter is required")
        .test(
          "fileType",
          "Unsupported File Format",
          (value: any) => value && isValidFileType(value.name, "type")
        )
        .test(
          "is-valid-size",
          "Max allowed size is 2MB",
          (value: any) => value && value.size <= MAX_FILE_SIZE
        )
    )
    .required("At least two Recomendation Letter is required")
    .min(2, "At least two Recomendation Letter is required")
    .max(5, "Maximum 5"),
});

export const notSfuEducationInfoUpdateSchema = object({
  recDoc: array()
    .of(
      mixed()
        .required("Recomendation Letter is required")
        .test(
          "fileType",
          "Unsupported File Format",
          (value: any) => value && isValidFileType(value.name, "type")
        )
        .test(
          "is-valid-size",
          "Max allowed size is 2MB",
          (value: any) => value && value.size <= MAX_FILE_SIZE
        )
    )
    .required("At least two Recomendation Letter is required")
    .min(2, "At least two Recomendation Letter is required")
    .max(5, "Maximum 5"),
});

export const educationExistDataInfoSchema = educationInfoSchema.shape({
  certificateDoc: array().notRequired(),
  english_results: array().notRequired(),
  workRecomendation: array().notRequired(),
});

/* eslint-disable @typescript-eslint/no-explicit-any */
import { array, mixed, object } from "yup";
import { MAX_FILE_SIZE, isValidFileType } from "../helper";

export const certificateFileSchema = object({
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
    .min(1, "At least one Certificate Document is required"),
});

export const englishFileSchema = object({
  englishDoc: array()
    .of(
      mixed()
        .required("English Document is required")
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
    .required("At least one English Document is required")
    .min(1, "At least one English Document is required"),
});

export const recomendFileSchema = object({
  recDoc: array()
    .of(
      mixed()
        .required("Recomendation Document is required")
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
    .required("At least one Recomendation Document is required")
    .min(1, "At least one Recomendation Document is required"),
});

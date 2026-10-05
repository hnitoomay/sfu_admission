import { array, InferType, object, string } from "yup";
import { dateErrMsg, requiredErrMsg } from "../validation-message";
import { DATE_FORMAT_REGEX } from "../validation-format";

export const profileEducationSchema = object({
  university: string().required(requiredErrMsg("University")),
  degree: string().required(requiredErrMsg("Degree")),
  field: string().required(requiredErrMsg("Field")),
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
  certificateDoc: array().nullable()
});

export type ProfileEducationVType = InferType<typeof profileEducationSchema>;